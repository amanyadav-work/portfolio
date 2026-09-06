import Resume from "@/components/Resume";

export const metadata = {
  title: "Aman's Resume - Workfolio",
  description:
    "Aman Yadav's resume - Fullstack Developer working with Next.js, Golang, and MERN.",
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumePage() {
  return <Resume />;
}