import Image from 'next/image'

const team = [
  { name: 'Sarah Johnson', role: 'CEO & Founder', image: '/teams-1.jpeg' },
  { name: 'Michael Chen', role: 'Publishing Director', image: '/teams-2.jpeg' },
  { name: 'Emily Roberts', role: 'Marketing Lead', image: '/teams-1.jpeg' },
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The talented individuals behind Cylage who bring expertise, creativity, and passion to
            every project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

