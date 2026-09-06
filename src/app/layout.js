import "./globals.css";

export const metadata = {
  title: {
    default: "Aman Yadav | Software Development Engineer",
    template: "%s | Aman Yadav",
  },
  description:
    "Aman Yadav is a Software Development Engineer building Golang services, Next.js applications, data ingestion pipelines, DAG workflows, and real-time data platforms.",
  keywords: [
    "Aman Yadav",
    "Software Development Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "Next.js",
    "Golang",
    "Go",
    "React",
    "data analytics platforms",
    "workflow execution",
    "DAG workflows",
    "data ingestion",
    "real-time data processing",
    "Kafka",
    "Redis",
    "PostgreSQL",
    "MongoDB",
    "DuckDB",
    "RBAC",
    "SaaS platforms",
    "distributed systems",
    "portfolio",
    "Mumbai",
    "India",
  ],
  authors: [{ name: "Aman Yadav" }],
  creator: "Aman Yadav",
  publisher: "Aman Yadav",
  category: "technology",
  metadataBase: new URL("https://www.yadavaman.com"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.yadavaman.com/",
    siteName: "Aman Yadav - Software Development Engineer",
    title: "Aman Yadav | Golang, Next.js & Data Systems Engineer",
    description:
      "Portfolio of Aman Yadav, a Software Development Engineer working across Golang services, Next.js applications, workflow engines, data ingestion, and real-time processing.",
    images: [
      {
        url: "/assets/profile-pic.webp",
        width: 1200,
        height: 630,
        alt: "Aman Yadav – Fullstack Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aman Yadav | Software Development Engineer",
    description:
      "Software Development Engineer building Golang services, Next.js applications, data workflows, and real-time data systems.",
    images: ["/assets/profile-pic.webp"],
    creator: "@amanwebdev",
  },

  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
    ],
    shortcut: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export const viewport = {
  themeColor: "#181A20",
  colorScheme: "dark",
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aman Yadav",
  url: "https://www.yadavaman.com",
  jobTitle: "Software Development Engineer",
  description:
    "Software Development Engineer working across Golang, Next.js, data ingestion, workflow execution, and real-time data platforms.",
  image: "https://www.yadavaman.com/assets/profile-pic.webp",
  sameAs: [
    "https://www.linkedin.com/in/amanyadav-workprofile/",
    "https://github.com/amanyadav-work",
    "https://www.behance.net/aman-yadav",
  ],
  knowsAbout: [
    "Golang",
    "Next.js",
    "Data ingestion",
    "Kafka",
    "Redis",
    "DAG workflow execution",
    "Real-time data processing",
    "RBAC",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Signika+Negative:wght@300..700&display=swap"
          rel="stylesheet"
        />

      </head>

      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
