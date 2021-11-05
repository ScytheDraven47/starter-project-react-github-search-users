import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import Chart from './Chart'
import { CHART_TYPES } from './Chart'

const Repos = () => {
	const { repos } = React.useContext(GithubContext)

	let { languageCounts, languageStars, repoStars, repoForks } = repos.reduce(
		(acc, repo) => {
			if (repo.language) {
				acc.languageCounts[repo.language] = {
					label: repo.language,
					value: acc.languageCounts[repo.language]?.value + 1 || 1,
				}
				acc.languageStars[repo.language] = {
					label: repo.language,
					value:
						acc.languageStars[repo.language]?.value +
							repo.stargazers_count || repo.stargazers_count,
				}
			}
			acc.repoStars[repo.name] = {
				label: repo.name,
				value: repo.stargazers_count,
			}
			acc.repoForks[repo.name] = {
				label: repo.name,
				value: repo.forks_count,
			}
			return acc
		},
		{ languageCounts: {}, languageStars: {}, repoStars: {}, repoForks: {} }
	)

	languageCounts = Object.values(languageCounts)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5)
	languageStars = Object.values(languageStars)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5)
	repoStars = Object.values(repoStars)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5)
	repoForks = Object.values(repoForks)
		.sort((a, b) => b.value - a.value)
		.slice(0, 5)

	return (
		<section className='section'>
			<Wrapper className='section-center'>
				<Chart
					chartData={languageCounts}
					chartType={CHART_TYPES.PIE}
					isFlat={false}
					title={'Languages'}
					subtitle={'Top 5'}
					suffix={' repos'}
				/>
				<Chart
					chartData={repoStars}
					chartType={CHART_TYPES.BAR.Y}
					isFlat={false}
					title={'Most Popular'}
					subtitle={'Top 5'}
					suffix={' stars'}
					labelX={'Repos'}
					labelY={'Stars'}
				/>
				<Chart
					chartData={languageStars}
					chartType={CHART_TYPES.DONUT}
					isFlat={true}
					title={'Stars Per Language'}
					subtitle={'Top 5'}
					suffix={' stars'}
				/>
				<Chart
					chartData={repoForks}
					chartType={CHART_TYPES.BAR.X}
					isFlat={true}
					title={'Most Forks'}
					subtitle={'Top 5'}
					suffix={' stars'}
					labelX={'Forks'}
					labelY={'Stars'}
				/>
			</Wrapper>
		</section>
	)
}

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		background-color: var(--clr-white) !important;
		width: 100% !important;
	}
	.fusioncharts-container {
		background-color: var(--clr-white) !important;
		width: 100% !important;
	}
	svg {
		background-color: var(--clr-white) !important;
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`

export default Repos
