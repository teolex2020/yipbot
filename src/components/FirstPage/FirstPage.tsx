'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Компоненти, що використовуються в додатку ---

// Іконка стрілки
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

// Іконка для чат-бульбашки
const MessageSquareIcon = ({ className }) => (
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
		<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'></path>
	</svg>
)

// Іконка меню
const MenuIcon = ({ className }) => (
	<svg
		className={className}
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M4 6h16M4 12h16M4 18h16'
		/>
	</svg>
)

// --- Основний компонент додатку ---

export default function App() {
	const [view, setView] = useState('landing')
	const [query, setQuery] = useState('')
	const [answer, setAnswer] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showInitialContent, setShowInitialContent] = useState(true)

	const ask = async () => {
		if (!query.trim()) return
		setLoading(true)
		setShowInitialContent(false)
		setTimeout(() => {
			setAnswer({
				text: `🔮 Тут з'явиться відповідь, згенерована ШІ на основі аналітичних даних по запиту: "${query}". Ця відповідь є імітацією і буде замінена на результат роботи моделі. Вона може включати текст, таблиці та посилання на джерела.`,
				sources: [
					{ title: 'Звіт про ВВП України за Q4 2023', url: '#' },
					{ title: 'Прогноз інфляції від Національного Банку', url: '#' },
					{ title: 'Статистика ринку праці', url: '#' },
				],
			})
			setLoading(false)
		}, 1200)
	}

	const askNewQuestion = () => {
		setAnswer(null)
		setQuery('')
		setShowInitialContent(true)
	}

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { staggerChildren: 0.1, duration: 0.5 },
		},
	}
	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	}
	const trendingTopics = [
		'ВВП України 2024',
		'Інфляція квітень 2025',
		'Безробіття 2023 vs 2024',
		'Промвиробництво Q1 2025',
	]

	return (
		<div className='min-h-screen w-full bg-white text-slate-900 font-sans'>
			{/* Хедер у стилі McKinsey */}
			<header className='bg-white shadow-sm border-b border-slate-200'>
				<div className='container mx-auto px-4 py-4 flex justify-between items-center'>
					<div className='flex items-center'>
						<MenuIcon className='w-6 h-6 mr-4 md:hidden' />
						<div>
							<h1 className='text-lg font-bold text-slate-900'>
								Український Інститут Політики
							</h1>
						</div>
					</div>
					<nav className='hidden md:flex items-center gap-8 text-sm'>
						<a href='#' className='text-slate-700 hover:text-slate-900'>
							Дослідження
						</a>
						<a href='#' className='text-slate-700 hover:text-slate-900'>
							Можливості
						</a>
						<a href='#' className='text-slate-700 hover:text-slate-900'>
							Рекомендовані статті
						</a>

						<a href='#' className='text-slate-700 hover:text-slate-900'>
							Про нас
						</a>
					</nav>
					<div className='flex items-center gap-4 text-sm'>
						<a href='#' className='text-blue-600 hover:text-blue-800'>
							Увійти
						</a>
						<span className='text-slate-400'>|</span>
						<a href='#' className='text-blue-600 hover:text-blue-800'>
							Підписатися
						</a>
					</div>
				</div>
			</header>

			<AnimatePresence mode='wait'>
				{view === 'landing' && (
					<motion.div
						key='landing'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
					>
						<main>
							{/* Hero Section у стилі McKinsey */}
							<div className='grid md:grid-cols-2 min-h-[580px]'>
								<div className='bg-slate-900 p-8 md:p-16 flex flex-col justify-center text-white'>
									<span className='text-xs font-bold tracking-widest text-white/60 uppercase mb-4'>
										БЕТА
									</span>
									<h2 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>
										Запитайте в Українського Інституту Політики
									</h2>
									<p className='text-white/80 text-lg leading-relaxed'>
										Цей пілот нашого нового ШІ чатботу охоплює цифрові
										технології, медіа та телеком. Інші теми скоро з'являться.
										Будь ласка, перевіряйте всі відповіді, використовуючи
										наведені джерела.
									</p>
								</div>
								<div className='bg-blue-600 p-8 md:p-16 flex items-center justify-center'>
									<div className='text-center text-white'>
										<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6'>
											<MessageSquareIcon className='w-8 h-8' />
										</div>
										<p className='text-2xl font-medium'>
											Привіт! 👋 Я, ШІ чатбот, який відповідає на ваші запитання
										</p>
									</div>
								</div>
							</div>

							{/* Центральна секція */}
							<div className='bg-gray-50 py-16 md:py-24'>
								<div className='container mx-auto px-4 text-center'>
									<h3 className='text-3xl md:text-4xl font-bold text-slate-900 max-w-4xl mx-auto mb-8 leading-tight'>
										Отримайте відповіді на питання, які важливі для вас—на
										основі аналітичних матеріалів Українського Інституту
										Політики.
									</h3>
									<button
										onClick={() => setView('chat')}
										className='inline-flex items-center px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-sm font-medium hover:bg-blue-600 hover:text-white transition-all duration-300'
									>
										Досліджувати
									</button>
								</div>
							</div>

							{/* Секції особливостей */}
							<div className='container mx-auto px-4 py-20 space-y-24'>
								{/* Реєстрація */}
								<div className='grid md:grid-cols-2 gap-12 items-center'>
									<div className='order-last md:order-first'>
										<h4 className='text-3xl font-bold text-slate-900 mb-6'>
											Зареєструйтеся. Це легко!
										</h4>
										<p className='text-slate-700 text-lg leading-relaxed'>
											Швидко та безпечно зареєструйтеся, використовуючи
											одноразовий код для безперешкодного доступу до чатботу
											Українського Інституту Політики, де ви можете ставити
											запитання так, як вам зручно.
										</p>
									</div>
									<div className='relative'>
										<div className='bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden'>
											<div className='bg-slate-50 px-4 py-2 border-b border-slate-200'>
												<div className='flex space-x-2'>
													<div className='w-3 h-3 bg-red-400 rounded-full'></div>
													<div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
													<div className='w-3 h-3 bg-green-400 rounded-full'></div>
												</div>
											</div>
											<div className='p-8'>
												<div className='space-y-4'>
													<div className='flex space-x-4'>
														<div className='w-1/2 bg-slate-100 h-4 rounded'></div>
														<div className='w-1/3 bg-blue-600 h-8 rounded text-xs text-white flex items-center justify-center'>
															Форма реєстрації
														</div>
													</div>
													<div className='space-y-2'>
														<div className='w-3/4 bg-slate-100 h-3 rounded'></div>
														<div className='w-1/2 bg-slate-100 h-3 rounded'></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Надійні джерела */}
								<div className='grid md:grid-cols-2 gap-12 items-center'>
									<div className='relative'>
										<div className='bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden'>
											<div className='bg-slate-50 px-4 py-2 border-b border-slate-200'>
												<div className='flex space-x-2'>
													<div className='w-3 h-3 bg-red-400 rounded-full'></div>
													<div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
													<div className='w-3 h-3 bg-green-400 rounded-full'></div>
												</div>
											</div>
											<div className='p-8'>
												<div className='space-y-4'>
													<div className='w-3/4 bg-slate-900 h-4 rounded'></div>
													<div className='space-y-2'>
														<div className='w-full bg-slate-100 h-3 rounded'></div>
														<div className='w-5/6 bg-slate-100 h-3 rounded'></div>
														<div className='w-2/3 bg-slate-100 h-3 rounded'></div>
													</div>
													<div className='grid grid-cols-3 gap-2 mt-6'>
														<div className='bg-slate-100 h-12 rounded'></div>
														<div className='bg-slate-100 h-12 rounded'></div>
														<div className='bg-slate-100 h-12 rounded'></div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div>
										<h4 className='text-3xl font-bold text-slate-900 mb-6'>
											Отримайте відповіді на основі джерела, якому ви можете
											довіряти...
										</h4>
										<p className='text-slate-700 text-lg leading-relaxed'>
											Відповіді чатботу Українського Інституту Політики
											генеруються на основі наших досліджень та опублікованих
											аналітичних матеріалів, надаючи вам персоналізовані,
											засновані на даних перспективи щодо ключових
											бізнес-викликів та викликів управління.
										</p>
									</div>
								</div>

								{/* Перевірка */}
								<div className='grid md:grid-cols-2 gap-12 items-center'>
									<div className='order-last md:order-first'>
										<h4 className='text-3xl font-bold text-slate-900 mb-6'>
											... та перевіряйте
										</h4>
										<p className='text-slate-700 text-lg leading-relaxed'>
											Всі резюме чатботу Українського Інституту Політики надають
											виноски до оригінальних джерел—а також повний список
											посилань—щоб ви могли перевірити точність даних.
										</p>
									</div>
									<div className='relative'>
										<div className='bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden'>
											<div className='bg-slate-50 px-4 py-2 border-b border-slate-200'>
												<div className='flex space-x-2'>
													<div className='w-3 h-3 bg-red-400 rounded-full'></div>
													<div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
													<div className='w-3 h-3 bg-green-400 rounded-full'></div>
												</div>
											</div>
											<div className='p-8'>
												<div className='space-y-4'>
													<div className='flex items-center space-x-2 mb-4'>
														<div className='w-2 h-2 bg-blue-600 rounded-full'></div>
														<div className='w-1/3 bg-slate-100 h-3 rounded'></div>
													</div>
													<div className='flex items-center space-x-2'>
														<div className='w-2 h-2 bg-blue-600 rounded-full'></div>
														<div className='w-1/2 bg-slate-100 h-3 rounded'></div>
													</div>
													<div className='grid grid-cols-4 gap-2 mt-6'>
														<div className='bg-blue-600 h-8 rounded text-xs text-white flex items-center justify-center'>
															Джерело 1
														</div>
														<div className='bg-blue-600 h-8 rounded text-xs text-white flex items-center justify-center'>
															Джерело 2
														</div>
														<div className='bg-blue-600 h-8 rounded text-xs text-white flex items-center justify-center'>
															Джерело 3
														</div>
														<div className='bg-blue-600 h-8 rounded text-xs text-white flex items-center justify-center'>
															Джерело 4
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Футер */}
							<footer className='bg-slate-900 text-white py-12'>
								<div className='container mx-auto px-4'>
									<div className='grid md:grid-cols-4 gap-8'>
										<div>
											<h5 className='font-bold mb-4'>
												Українського Інституту Політики
											</h5>
											<p className='text-slate-400 text-sm'>
												Підпишіться на наші останні аналітичні матеріали
											</p>
											<div className='mt-4 flex'>
												<input
													type='email'
													placeholder='Email адреса'
													className='flex-1 px-4 py-2 text-slate-900 rounded-l'
												/>
												<button className='bg-blue-600 px-6 py-2 rounded-r hover:bg-blue-700'>
													Підписатися
												</button>
											</div>
										</div>
										<div>
											<h6 className='font-semibold mb-4'>Зв'яжіться з нами</h6>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li>
													<a href='#' className='hover:text-white'>
														Контакти
													</a>
												</li>
												<li>
													<a href='#' className='hover:text-white'>
														Попередження про скам
													</a>
												</li>
												<li>
													<a href='#' className='hover:text-white'>
														FAQ
													</a>
												</li>
											</ul>
										</div>
										<div>
											<h6 className='font-semibold mb-4'>Правова інформація</h6>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li>
													<a href='#' className='hover:text-white'>
														Політика конфіденційності
													</a>
												</li>
												<li>
													<a href='#' className='hover:text-white'>
														Налаштування cookies
													</a>
												</li>
												<li>
													<a href='#' className='hover:text-white'>
														Умови використання
													</a>
												</li>
											</ul>
										</div>
										<div>
											<h6 className='font-semibold mb-4'>Мова та регіон</h6>
											<ul className='space-y-2 text-sm text-slate-400'>
												<li>
													<a href='#' className='hover:text-white'>
														Інформація про локальну мову
													</a>
												</li>
												<li>
													<a href='#' className='hover:text-white'>
														Заява про доступність
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div className='border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400'>
										© 2025 Український Інститут Політики
									</div>
								</div>
							</footer>
						</main>
					</motion.div>
				)}

				{view === 'chat' && (
					<motion.div
						key='chat'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.3 } }}
						className='bg-white min-h-screen'
					>
						{/* Інтерфейс чату */}
						<div className='container mx-auto px-4 py-8 sm:py-16 flex flex-col items-center gap-10'>
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
											className='text-4xl sm:text-5xl font-bold tracking-tight text-slate-900'
										>
											Запитайте вашу{' '}
											<span className='text-blue-600'>аналітику</span>
										</motion.h1>
										<motion.div variants={itemVariants} className='w-full'>
											<p className='text-slate-600 mb-6 text-lg'>
												Отримайте відповіді на основі внутрішньої бази знань
												компанії
											</p>
											<div className='flex flex-col sm:flex-row gap-3'>
												<input
													className='flex-grow text-base h-14 bg-white border-2 border-slate-300 rounded-sm px-4 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300'
													placeholder="Наприклад: 'Які прогнози по ВВП України у 2024 році?'"
													value={query}
													onChange={(e) => setQuery(e.target.value)}
													onKeyDown={(e) => e.key === 'Enter' && ask()}
												/>
												<button
													className='h-14 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-medium transition-colors duration-300 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center'
													onClick={ask}
													disabled={loading || !query.trim()}
												>
													{loading ? 'Аналізуємо...' : 'Спитати'}
												</button>
											</div>
										</motion.div>
										<motion.div
											variants={itemVariants}
											className='flex flex-wrap gap-3 justify-center'
										>
											<span className='text-slate-600 text-sm mr-2'>
												Популярні теми:
											</span>
											{trendingTopics.map((topic) => (
												<button
													key={topic}
													onClick={() => {
														setQuery(topic)
													}}
													className='cursor-pointer bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full px-4 py-2 text-sm text-slate-700 transition-colors duration-300'
												>
													{topic}
												</button>
											))}
										</motion.div>
									</motion.div>
								)}
							</AnimatePresence>
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
										<div className='mb-6'>
											<h2 className='text-slate-600 text-lg'>Ваш запит:</h2>
											<p className='text-xl font-medium text-blue-600'>
												"{query}"
											</p>
										</div>
										<div className='bg-white border border-slate-200 rounded-lg shadow-lg'>
											<div className='p-6'>
												<div className='prose max-w-none text-slate-700'>
													<p>{answer.text}</p>
												</div>
											</div>
										</div>
										<div className='mt-6'>
											<h3 className='text-slate-600 mb-3 font-medium'>
												Джерела:
											</h3>
											<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
												{answer.sources.map((source, index) => (
													<a
														href={source.url}
														key={index}
														target='_blank'
														rel='noopener noreferrer'
														className='block p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all duration-300'
													>
														<p className='font-medium text-slate-900 text-sm'>
															{source.title}
														</p>
													</a>
												))}
											</div>
										</div>
										<button
											className='mt-8 text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors duration-300'
											onClick={askNewQuestion}
										>
											Задати нове запитання{' '}
											<ArrowUpRight className='w-4 h-4 ml-1' />
										</button>
									</motion.div>
								)}
							</AnimatePresence>
							<AnimatePresence>
								{loading && (
									<motion.div
										key='loader'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='flex flex-col items-center gap-3 text-slate-600'
									>
										<svg
											className='animate-spin h-8 w-8 text-blue-600'
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
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
