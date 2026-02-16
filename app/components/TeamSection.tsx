import Image from 'next/image'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const team = [
  { name: 'Sarah Johnson', title: 'Product Strategist', image: '/teams-1.jpeg', linkedin: '#' },
  { name: 'Michael Chen', title: 'Product Strategist', image: '/teams-2.jpeg', linkedin: '#' },
  { name: 'Emily Roberts', title: 'Product Strategist', image: '/teams-1.jpeg', linkedin: '#' },
  { name: 'David Williams', title: 'Product Strategist', image: '/teams-2.jpeg', linkedin: '#' },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The talented individuals behind Cylage who bring expertise, creativity, and passion to
            every project.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-[3/4] max-w-[280px] rounded-[1.25rem] overflow-hidden mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <h4 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{member.name}</h4>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-gray-600 font-normal text-sm lg:text-base">{member.title}</span>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
