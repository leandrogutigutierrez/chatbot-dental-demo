import ChatWidget from './components/features/ChatWidget'

const services = [
  { icon: '🦷', name: 'Teeth Cleaning', price: '$80', desc: 'Professional cleaning to keep your smile healthy and bright.' },
  { icon: '✨', name: 'Whitening', price: '$200', desc: 'Advanced whitening treatment for a radiant, confident smile.' },
  { icon: '😁', name: 'Braces Consultation', price: 'Free', desc: 'Expert orthodontic evaluation with no commitment required.' },
]

const ServiceCard = ({ icon, name, price, desc }) => (
  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col gap-3">
    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl">{icon}</div>
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-800 text-base">{name}</h3>
      <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-2 py-0.5 rounded-full">{price}</span>
    </div>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
)

const App = () => (
  <div className="min-h-screen bg-gray-50 font-sans">

    {/* Nav */}
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-blue-600 text-xl">🦷</span>
        <span className="font-bold text-gray-900 text-lg">Dental Care Pro</span>
      </div>
      <div className="hidden sm:flex items-center gap-6 text-sm text-gray-500">
        <a href="#services" className="hover:text-blue-600 transition-colors duration-150">Services</a>
        <a href="#hours" className="hover:text-blue-600 transition-colors duration-150">Hours</a>
        <a href="#location" className="hover:text-blue-600 transition-colors duration-150">Location</a>
      </div>
    </nav>

    {/* Hero */}
    <section className="bg-blue-600 text-white px-6 py-20 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🦷</div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">Your Smile,<br />Our Priority</h1>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">Professional dental care with a warm, personal touch. From cleanings to orthodontics, we've got you covered.</p>
        <a
          href="#services"
          className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors duration-200 shadow-md"
        >
          Explore Services
        </a>
      </div>
    </section>

    {/* Services */}
    <section id="services" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Our Services</h2>
      <p className="text-gray-500 text-center mb-10 text-sm">Quality dental care for every need and budget</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {services.map((s) => <ServiceCard key={s.name} {...s} />)}
      </div>
    </section>

    {/* Hours & Location */}
    <section id="hours" className="bg-gray-800 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div id="location">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><span>🕐</span> Hours</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between"><span>Monday – Friday</span><span className="text-white font-medium">8:00 AM – 6:00 PM</span></div>
            <div className="flex justify-between"><span>Saturday</span><span className="text-white font-medium">9:00 AM – 2:00 PM</span></div>
            <div className="flex justify-between"><span>Sunday</span><span className="text-gray-500">Closed</span></div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><span>📍</span> Location</h3>
          <p className="text-gray-300 text-sm leading-relaxed">123 Main Street<br />Downtown District<br />Open for walk-ins welcome during business hours.</p>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-gray-900 text-gray-500 text-center py-6 text-xs">
      © {new Date().getFullYear()} Dental Care Pro · All rights reserved
    </footer>

    {/* Floating chat widget */}
    <ChatWidget />
  </div>
)

export default App
