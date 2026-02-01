import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <Image src="/cylage_logo.png" alt="Cylage" width={150} height={60} className="h-12 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-400 leading-relaxed">
              Empowering authors and businesses through exceptional publishing and marketing services.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Publishing</li>
              <li className="text-gray-400">Business Marketing</li>
              <li className="text-gray-400">Author Marketing</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Cylage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
