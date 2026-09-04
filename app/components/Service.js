const occasions = [
  {
    title: "Thank You Cards",
    description: "For teachers, mentors, friends, colleagues & special people.",
    icon: "envelope",
  },
  {
    title: "Birthday Cards",
    description: "Personalized birthday experiences instead of ordinary messages.",
    icon: "cake",
  },
  {
    title: "Appreciation Cards",
    description: "Say something meaningful in a beautiful way.",
    icon: "heart",
  },
  {
    title: "Farewell & Graduation",
    description: "A memorable goodbye or congratulations.",
    icon: "star",
  },
  {
    title: "Anniversary & Love",
    description: "Personalized cards for special relationships.",
    icon: "sparkle",
  },
  {
    title: "Custom Cards",
    description: "Tell me your idea and I'll design it just for you.",
    icon: "pen",
  },
];

function OccasionIcon({ type }) {
  if (type === "heart") {
    return <span aria-hidden="true">♡</span>;
  }

  if (type === "star" || type === "sparkle") {
    return <span aria-hidden="true">✦</span>;
  }

  if (type === "cake") {
    return <span aria-hidden="true">⌁</span>;
  }

  if (type === "pen") {
    return <span aria-hidden="true">↗</span>;
  }

  return <span aria-hidden="true">✉</span>;
}

export default function Service() {
  return (
    <section className="services" id="service">
      <div className="services-inner">
        <div className="services-heading">
          <p className="services-eyebrow">What You Can Create</p>
          <h2>Cards Made For Your Moment <span aria-hidden="true">♡</span></h2>
        </div>

        <div className="services-grid">
          {occasions.map((occasion) => (
            <a className="service-card" href="/create" key={occasion.title}>
              <span className="service-icon">
                <OccasionIcon type={occasion.icon} />
              </span>
              <h3>{occasion.title}</h3>
              <p>{occasion.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
