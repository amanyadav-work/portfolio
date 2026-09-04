import { Helmet } from 'react-helmet-async';

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>Aman's Resume  - Workfolio</title>
        <meta name="description" content="Aman Yadav's resume – Fullstack Developer (Next.js, Golang, MERN). Download or view the PDF resume online." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Aman Yadav – Resume" />
        <meta property="og:description" content="Aman Yadav's resume – Fullstack Developer (Next.js, Golang, MERN). Download or view the PDF resume online." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.yadavaman.com/resume" />
        <meta property="og:image" content="/assets/profile-pic.webp" />
        <link rel="canonical" href="https://www.yadavaman.com/resume" />
      </Helmet>
      <div style={{width: '100vw', height: '100svh', margin: 0, padding: 0, overflow: 'hidden'}}>
        <embed src="https://site-accb695e.hostupa.com/" width="100%" height="100%" type="application/pdf" />
      </div>
    </>
  );
};

export default Resume;
