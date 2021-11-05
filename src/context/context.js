import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext() // {Provider, Consumer}

const isSinglePromiseFulfilled = (item) => item.status === 'fulfilled'
const isPromiseFulfilled = (...items) =>
	items.every((item) => item.status === 'fulfilled')

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser)
	const [repos, setRepos] = useState(mockRepos)
	const [followers, setFollowers] = useState(mockFollowers)
	const [requests, setRequests] = useState({ limit: 60, remaining: 0 })
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const searchUser = (user) => {
		if (!user) return
		setError('')
		setIsLoading(true)

		axios(`${rootUrl}/users/${user}`)
			.then((response) => {
				const { followers_url, repos_url } = response.data
				setGithubUser(response.data)
				// return axios(`${repos_url}`)
				return Promise.allSettled([
					axios(`${repos_url}`),
					axios(`${followers_url}`),
				])
			})
			.then((results) => {
				const [repos, followers] = results
				if (isSinglePromiseFulfilled(repos)) setRepos(repos.value.data)
				if (isSinglePromiseFulfilled(followers))
					setFollowers(followers.value.data)
				console.log({ repos, followers })
				checkRequests()
				setIsLoading(false)
				if (!isPromiseFulfilled(...results))
					throw new Error('something went wrong...')
			})
			.catch((error) => {
				setError(
					error?.response?.status === 404
						? 'User not found'
						: error.toString()
				)
				checkRequests()
				setIsLoading(false)
			})
	}

	const checkRequests = () => {
		setIsLoading(true)
		axios(`${rootUrl}/rate_limit`)
			.then((response) => {
				const { limit, remaining } = response.data.rate
				setRequests({ limit, remaining })
				if (remaining === 0) throw new Error('Hourly rate exceeded')
				setIsLoading(false)
			})
			.catch((error) => {
				setError(error.toString())
				setIsLoading(false)
			})
	}

	useEffect(checkRequests, [])

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				requests,
				isLoading,
				error,
				searchUser,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}

export { GithubProvider, GithubContext }
