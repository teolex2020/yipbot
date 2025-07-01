"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Іконка стрілки, аналог lucide-react
const ArrowUpRight = ({ className }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}
	>
		<path d='M7 7h10v10' />
		<path d='M7 17 17 7' />
	</svg>
)

// Приклади популярних тем
const trendingTopics = [
	'ВВП України 2024',
	'Інфляція квітень 2025',
	'Безробіття 2023 vs 2024',
	'Промвиробництво Q1 2025',
]

export default function TestChat() {
	const [query, setQuery] = useState('')
	const [answer, setAnswer] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showInitialContent, setShowInitialContent] = useState(true)

	// Функція для відправки запиту
	const ask = async () => {
		if (!query.trim()) return
		setLoading(true)
		setShowInitialContent(false) // Ховаємо початковий контент, щоб показати відповідь

		// Імітація виклику API до Convex + OpenAI
		// TODO: Замінити на реальний виклик Convex-функції
		setTimeout(() => {
			setAnswer({
				text: `🔮 Тут з'явиться відповідь, згенерована LLM на основі аналітичних даних по запиту: "${query}". Ця відповідь є імітацією і буде замінена на результат роботи моделі. Вона може включати текст, таблиці та посилання на джерела.`,
				sources: [
					{ title: 'Звіт про ВВП України за Q4 2023', url: '#' },
					{ title: 'Прогноз інфляції від Національного Банку', url: '#' },
					{ title: 'Статистика ринку праці', url: '#' },
				],
			})
			setLoading(false)
		}, 1200)
	}

	// Функція для скидання стану та повернення на головний екран
	const askNewQuestion = () => {
		setAnswer(null)
		setQuery('')
		setShowInitialContent(true)
	}

	// Варіанти анімації для контейнера
	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				staggerChildren: 0.1,
				duration: 0.5,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	}

	return (
		<div className='min-h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 text-white font-sans'>
			<div className='container mx-auto px-4 py-8 sm:py-16 flex flex-col items-center gap-10'>
				{/* Анімована присутність початкового контенту */}
				<AnimatePresence>
					{showInitialContent && (
						<motion.div
							key='initial-content'
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
							className='w-full max-w-3xl flex flex-col items-center gap-10 text-center'
						>
							<motion.h1
								variants={itemVariants}
								className='text-4xl sm:text-5xl font-extrabold tracking-tight'
							>
								Запитайте вашу <span className='text-teal-400'>аналітику</span>
							</motion.h1>

							<motion.div variants={itemVariants} className='w-full'>
								<p className='text-slate-400 mb-4'>
									Отримайте відповіді на основі внутрішньої бази знань компанії
								</p>
								<div className='flex flex-col sm:flex-row gap-2'>
									<input
										className='flex-grow text-base h-14 bg-slate-800/60 border border-slate-700 rounded-md px-4 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-shadow duration-300'
										placeholder="Наприклад: 'Які прогнози по ВВП України у 2024 році?'"
										value={query}
										onChange={(e) => setQuery(e.target.value)}
										onKeyDown={(e) => e.key === 'Enter' && ask()}
									/>
									<button
										className='h-14 px-6 text-base bg-teal-600 hover:bg-teal-500 rounded-md font-semibold transition-colors duration-300 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center'
										onClick={ask}
										disabled={loading || !query.trim()}
									>
										{loading ? 'Аналізуємо...' : 'Спитати'}
									</button>
								</div>
							</motion.div>

							<motion.div
								variants={itemVariants}
								className='flex flex-wrap gap-2 justify-center'
							>
								<span className='text-slate-300 text-sm mr-2'>
									Популярні теми:
								</span>
								{trendingTopics.map((topic) => (
									<button
										key={topic}
										onClick={() => {
											setQuery(topic)
										}}
										className='cursor-pointer backdrop-blur-md bg-slate-800/50 hover:bg-teal-600/80 rounded-full px-3 py-1 text-sm text-slate-200 hover:text-white transition-colors duration-300'
									>
										{topic}
									</button>
								))}
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Анімована поява панелі відповіді */}
				<AnimatePresence>
					{answer && (
						<motion.div
							key='answer-panel'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, transition: { duration: 0.3 } }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='max-w-4xl w-full'
						>
							{/* Картка з запитом користувача */}
							<div className='mb-6'>
								<h2 className='text-slate-400 text-lg'>Ваш запит:</h2>
								<p className='text-xl font-medium text-teal-300'>"{query}"</p>
							</div>

							{/* Картка з відповіддю */}
							<div className='bg-slate-800/60 border border-slate-700 rounded-lg shadow-2xl shadow-teal-900/10'>
								<div className='p-6'>
									<div className='prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-teal-400'>
										<p>{answer.text}</p>
									</div>
								</div>
							</div>

							{/* Джерела */}
							<div className='mt-6'>
								<h3 className='text-slate-400 mb-2'>Джерела:</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
									{answer.sources.map((source, index) => (
										<a
											href={source.url}
											key={index}
											target='_blank'
											rel='noopener noreferrer'
											className='block p-4 bg-slate-800/70 border border-slate-700 rounded-md hover:bg-slate-700/80 hover:border-teal-600 transition-all duration-300'
										>
											<p className='font-semibold text-slate-200 truncate'>
												{source.title}
											</p>
										</a>
									))}
								</div>
							</div>

							{/* Кнопка для нового запиту */}
							<button
								className='mt-8 text-teal-400 hover:text-teal-300 flex items-center transition-colors duration-300'
								onClick={askNewQuestion}
							>
								Задати нове запитання <ArrowUpRight className='w-4 h-4 ml-1' />
							</button>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Індикатор завантаження */}
				<AnimatePresence>
					{loading && (
						<motion.div
							key='loader'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='flex flex-col items-center gap-2 text-slate-400'
						>
							<svg
								className='animate-spin h-8 w-8 text-teal-500'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle
									className='opacity-25'
									cx='12'
									cy='12'
									r='10'
									stroke='currentColor'
									strokeWidth='4'
								></circle>
								<path
									className='opacity-75'
									fill='currentColor'
									d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
								></path>
							</svg>
							<span>Шукаємо відповідь у базі знань...</span>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
