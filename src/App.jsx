import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import step1 from './assets/steps-1.webp';
import step2 from './assets/steps-2.webp';
import step3 from './assets/steps-3.webp';
import igtvImg from './assets/igtv-downloader.webp';
import reelsImg from './assets/reels-downloader.webp';
import videoImg from './assets/video-downloader.webp';
import AdComponent from "./AdComponent";
// ===== Header Component =====
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-2">
          <img
            alt=""
            src="/download.jpeg"
            className="h-8 w-8"
          />
          <span className="text-2xl font-bold text-sky-500 tracking-wide">
            Igram Saver
          </span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-5 text-gray-700 text-sm">
          <Link to="/" className="hover:text-sky-700">
            Home
          </Link>
          <Link to="/disclaimer/" className="hover:text-sky-500">
            Disclaimer
          </Link>
          <Link to="/terms-of-service/" className="hover:text-sky-500">
            Terms of Service
          </Link>
          <Link to="/privacy-policy/" className="hover:text-sky-500">
            Privacy Policy
          </Link>
        </nav>
        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden block focus:outline-none"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 8h16M4 16h16'
              }
            />
          </svg>
        </button>
      </div>
      {/* Mobile Nav Drawer */}
      {open && (
        <nav className="md:hidden bg-white border-t p-4">
          <Link
            to="/"
            className="block py-2 text-gray-700 hover:text-sky-500"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/disclaimer/"
            className="block py-2 text-gray-700 hover:text-sky-500"
            onClick={() => setOpen(false)}
          >
            Disclaimer
          </Link>
          <Link
            to="/terms-of-service/"
            className="block py-2 text-gray-700 hover:text-sky-500"
            onClick={() => setOpen(false)}
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy-policy/"
            className="block py-2 text-gray-700 hover:text-sky-500"
            onClick={() => setOpen(false)}
          >
            Privacy Policy
          </Link>
        </nav>
      )}
    </header>
  );
}

// ===== Hero Section with Form ====


const cleanUrl = (url) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`;
  } catch (e) {
    return url; // Return original url if invalid
  }
};


const Hero = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const RAPIDAPI_KEY = "3a52e48628msh7e38c374580cb8ap19d787jsn097e0447797c";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const cleanedUrl = cleanUrl(inputUrl); // keep your own URL cleaning logic

    try {
      const apiUrl = `https://instagram-downloader38.p.rapidapi.com/api/v2/downloader?url=${encodeURIComponent(cleanedUrl)}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": "instagram-downloader38.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("RapidAPI Response:", data);

      let videoUrl = data?.data?.video_url;

      if (!videoUrl) {
        throw new Error("No video URL found. This might not be a video post.");
      }

      setResult({ video: videoUrl });
      setInputUrl(""); 
      setError("");
    } catch (err) {
      console.error("RapidAPI Error:", err.message);
      if (err.message.includes("401")) {
        setError("Invalid API key. Please verify your key.");
      } else if (err.message.includes("429")) {
        setError("Rate limit exceeded. Try again later.");
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-center p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Instagram Reel Downloader</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="url"
          placeholder="Paste Instagram Reel URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result?.video && (
        <div className="mt-6">
          <video src={result.video} controls className="w-full rounded" />
          <a
            href={result.video}
            download
            className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Video
          </a>
        </div>
      )}
    </section>
  );
};

// ads
<AdComponent />

// ===== Features Section =====
function Features() {
  const data = [
    {
      image: igtvImg,
      title: "IGTV Downloader",
      desc: "Effortlessly download long IGTV videos with a single click in high quality. Perfect for creators and binge-watchers who never want to miss a moment.",
    },
    {
      image: reelsImg,
      title: "Reels Saver",
      desc: "Save trending Instagram Reels instantly—no watermarks, no compromises. Get your favorite viral videos straight into your gallery.",
    },
    {
      image: videoImg,
      title: "HD Video Downloader",
      desc: "Grab any Instagram video post in crisp HD. Lightning-fast downloads, supporting single, carousel, and all video formats.",
    },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-5xl mx-auto px-3">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-sky-500">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map(({ image, title, desc }, idx) => (
            <div
              key={idx}
              className="rounded-2xl shadow-lg bg-purple-50 overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="flex flex-col items-center text-center px-6 py-6">
                <div className="text-xl sm:text-2xl font-semibold text-sky-500 mb-2">{title}</div>
                <p className="text-gray-700 text-base sm:text-lg font-medium">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






// ===== How to Use Section =====
function HowToUse() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-lg mx-auto px-4">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-sky-500 text-center">
          How to Use
        </h3>
        <div className="relative space-y-7">
          {/* Stepper line */}
          <div className="absolute top-8 left-5 h-[240px] sm:h-[250px] w-1 bg-green-200 rounded-full z-0"></div>
          {/* Steps */}
          {[
            {
              title: "Copy URL",
              desc: "Find the Instagram video you want and copy its URL",
              icon: (
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1h-6a1 1 0 00-1 1v9m10 4H4" />
                </svg>
              ),
            },
            {
              title: "Paste URL",
              desc: "Paste the URL into our downloader input field",
              icon: (
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 9V3a1 1 0 00-1-1h-6a1 1 0 00-1 1v6m10 4H4" />
                </svg>
              ),
            },
            {
              title: "Download",
              desc: "Click download and save the video to your device",
              icon: (
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ),
            },
          ].map((step, idx) => (
            <div key={idx} className="relative z-10 flex items-start gap-4 bg-white rounded-xl shadow p-5 pl-12">
              {/* Step number circle */}
              <div className="absolute -left-3 top-6 flex items-center justify-center w-8 h-8 bg-sky-500 rounded-full text-white font-bold border-4 border-white shadow">
                {idx + 1}
              </div>
              {/* Icon */}
              <div className="mt-2">{step.icon}</div>
              {/* Texts */}
              <div>
                <div className="font-semibold text-lg text-gray-800">{step.title}</div>
                <div className="text-gray-600 text-sm mt-1">{step.desc}</div>
              </div>
            </div>
          ))}
          {/* Try It Now Button */}
          <div className="flex justify-center pt-5">
            <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
              Try It Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


// ===== How To Download: Images + Card Steps (Add your own image paths here) =====
function HowToDownload() {
  return (
    <section className="py-12 bg-gray-100">
      <h3 className="text-2xl sm:text-3xl font-bold text-sky-500 text-center mb-9">
        How to Download — Step by Step
      </h3>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-3">
        {/* Step 1 */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={step1}
            alt="Copy Instagram Reel Link"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2">Step 1: Copy Reel Link</h4>
          <p className="text-gray-700 text-center">
            Instagram par jis reel ko download karna hai, uska<br />
            “Copy Link” option pe click karo aur link copy kar lo.
          </p>
        </div>
        {/* Step 2 */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={step2}
            alt="Paste Link and Click Download"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2">Step 2: Paste & Download</h4>
          <p className="text-gray-700 text-center">
            Is website pe aake copied link input box mein paste karo, phir<br />
            <b>Download</b> button pe click karo.
          </p>
        </div>
        {/* Step 3 */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={step3}
            alt="Download Reel Video"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2">Step 3: Save Your Reel</h4>
          <p className="text-gray-700 text-center">
            Video preview aa jaayega. Ab <b>Download</b> button dabao<br />
            aur reel apne mobile/computer mein save kar lo!
          </p>
        </div>
      </div>
    </section>
  );
}

// ===== FAQ Section =====
function FAQ() {
  const faqs = [
    {
      q: 'Is the tool completely free?',
      a: 'Yes! You can download unlimited reels for free. No hidden charges.'
    },
    {
      q: 'Do I need to sign up or login?',
      a: 'No registration needed—just paste and download.'
    },
    {
      q: 'Are my links or downloads stored?',
      a: 'Absolutely not. No data stored, 100% user privacy.'
    },
    {
      q: 'Does this work on mobile?',
      a: 'Yes, our site is fully optimized for all devices.'
    }
  ];
  return (
    <section className="bg-white py-10">
      <div className="max-w-3xl mx-auto px-3">
        <h3 className="text-2xl sm:text-3xl font-bold mb-7 text-sky-500 text-center">
          Frequently Asked Questions
        </h3>
        <div className="space-y-5">
          {faqs.map(({ q, a }, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sky-500">Q{i + 1}:</span>
                <span className="font-semibold">{q}</span>
              </div>
              <div className="ml-7 text-gray-700">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function SkySection() {
  return (
    <section className="bg-sky-50 py-12">
      <div className="max-w-2xl mx-auto px-4 rounded-2xl shadow-xl bg-white">
        <h3 className="text-2xl sm:text-3xl font-bold text-sky-500 text-center mb-8 tracking-tight">
          Why Choose Us?
        </h3>
        <div className="space-y-6">
          <div className="bg-sky-100 rounded-xl p-6 flex items-center gap-5 shadow">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-sky-500 text-white">
              {/* Replace this SVG with any relevant icon */}
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-lg text-sky-700">Lightning Fast Downloads</div>
              <div className="text-sky-600 text-sm mt-1">
                Instantly save your Instagram videos in HD with one click—zero waiting time.
              </div>
            </div>
          </div>
          <div className="bg-sky-100 rounded-xl p-6 flex items-center gap-5 shadow">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-sky-500 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17a5.25 5.25 0 104.5 0M9.75 11.25V7.5a3.75 3.75 0 117.5 0v3.75" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-lg text-sky-700">100% Safe & Private</div>
              <div className="text-sky-600 text-sm mt-1">
                Your downloads, your privacy. No login or watermark—complete peace of mind.
              </div>
            </div>
          </div>
          <div className="bg-sky-100 rounded-xl p-6 flex items-center gap-5 shadow">
            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-sky-500 text-white">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V8.75A2.75 2.75 0 019.75 6h4.5A2.75 2.75 0 0117 8.75v2.75M4.5 17.25v-3A.75.75 0 015.25 13.5h1.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75zm12 0v-3a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-lg text-sky-700">Seamless Across All Devices</div>
              <div className="text-sky-600 text-sm mt-1">
                Mobile, tablet, or desktop—ultimate experience everywhere, always in vibrant sky blue!
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-7">

        </div>
      </div>
    </section>
  );
}
function Testimonial() {
  const testimonials = [
    {
      quote:
        "I tried a lot of reel downloader sites before, but this is seriously the fastest, safest, and easiest! Zero ads, clear instructions, and I got my video in seconds. Love the clean sky-blue look too!",
      name: "Rohan S.",
      title: "Social Media Creator, Jaipur",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "This tool has made content repurposing so easy for our agency—no failed downloads, and our clients love the HD quality. The UI is beautiful and so simple to use!",
      name: "Priya Mehra",
      title: "Brand Manager, Delhi",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "Using this downloader is a breeze on both my mobile and laptop! It’s private, quick, and never asks for login—highly recommend for all Instagram fans.",
      name: "Aman Verma",
      title: "Student & Reel Enthusiast, Mumbai",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-lg mx-auto px-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-sky-500 text-center mb-8">
          What Our Users Say
        </h3>
        <div className="space-y-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg px-7 py-8 flex flex-col items-center space-y-4"
            >
              {/* Quote icon */}
              <svg
                className="h-10 w-10 text-sky-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17c0-2.485 2.067-4.5 4.5-4.5S16 14.515 16 17H7zm8 0c0-3.314-2.686-6-6-6s-6 2.686-6 6"
                />
              </svg>
              {/* Testimonial text */}
              <p className="text-lg sm:text-xl text-gray-800 text-center font-semibold">
                “{t.quote}”
              </p>
              {/* Separator */}
              <div className="h-1 w-16 bg-sky-500 rounded-full opacity-70 my-2"></div>
              {/* User info */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border-2 border-sky-400 shadow"
                  />
                  <span className="font-semibold text-sky-700">{t.name}</span>
                </div>
                <span className="text-gray-500 text-sm mt-1 text-center">
                  {t.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





// ===== Footer =====
function Footer() {
  return (
    <footer className="bg-gray-50 py-6 border-t text-center text-gray-500 text-sm">
      <nav className="space-x-3 mb-1 block">
        <Link to="/disclaimer/" className="hover:underline">Disclaimer</Link>
        <Link to="/terms-of-service/" className="hover:underline">Terms of Service</Link>
        <Link to="/privacy-policy/" className="hover:underline">Privacy Policy</Link>
      </nav>
      <div>&copy; 2025 Igram Saver. All rights reserved.</div>
      <div className="text-xs mt-1">Not affiliated with Instagram. For educational use only.</div>
    </footer>
  );
}

// ===== Legal Pages (Add your own content) =====
function Disclaimer() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 text-black">Disclaimer</h1>
      <div className="space-y-7 text-gray-800 text-base leading-relaxed">

        <div>
          <span className="block font-semibold text-lg mb-1">Last updated:</span>
          <span className="pl-2 text-sm">12 December 2024</span>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Interpretation and Definitions</h2>
          <h3 className="font-semibold text-lg mb-1">Interpretation</h3>
          <p>
            The words of which the initial letter is capitalized have meanings defined under the following conditions.
            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>
          <h3 className="font-semibold text-lg mt-4 mb-1">Definitions</h3>
          <ul className="list-disc pl-6">
            <li>
              <span className="font-semibold">Company</span> (referred to as either "the Company", "We", "Us" or "Our" in this Disclaimer) refers to iGram Saver
            </li>
            <li>
              <span className="font-semibold">Service</span> refers to the Website.
            </li>
            <li>
              <span className="font-semibold">You</span> means the individual accessing the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
            <li>
              <span className="font-semibold">Website</span> refers to iGram Saver, accessible from <a href="https://igramsaver.io" className="text-blue-600 underline" target="_blank" rel="noopener">https://igramsaver.io</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Disclaimer</h2>
          <p>
            This website (<span className="font-semibold">igramsaver.io</span>) is not affiliated with Meta or Instagram in any way.
            Also, this website does not violate any policy or guideline of Instagram or Meta, we don't host Instagram videos on our website.
            The website or the owner is not liable for any damage caused to any user.
          </p>
          <p>The information contained on the Service is for general information purposes only.</p>
          <p>The Company assumes no responsibility for errors or omissions in the contents of the Service.</p>
          <p>
            In no event shall the Company be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever,
            whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service.
            The Company reserves the right to make additions, deletions, or modifications to the contents on the Service at any time without prior notice.
            This Disclaimer has been created with the help of the{' '}
            <a href="https://www.freeprivacypolicy.com/free-disclaimer-generator/" className="text-blue-600 underline" target="_blank" rel="noopener">Free Disclaimer Generator</a>.
          </p>
          <p>The Company does not warrant that the Service is free of viruses or other harmful components.</p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">External Links Disclaimer</h2>
          <p>
            The Service may contain links to external websites that are not provided or maintained by or in any way affiliated with the Company.
          </p>
          <p>
            Please note that the Company does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Errors and Omissions Disclaimer</h2>
          <p>
            The information given by the Service is for general guidance on matters of interest only.
            Even if the Company takes every precaution to ensure that the content of the Service is both current and accurate, errors can occur.
            Plus, given the changing nature of laws, rules and regulations, there may be delays, omissions or inaccuracies in the information contained on the Service.
          </p>
          <p>
            The Company is not responsible for any errors or omissions, or for the results obtained from the use of this information.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Fair Use Disclaimer</h2>
          <p>
            The Company may use copyrighted material which has not always been specifically authorized by the copyright owner.
            The Company is making such material available for criticism, comment, news reporting, teaching, scholarship, or research.
          </p>
          <p>
            The Company believes this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the United States Copyright law.
          </p>
          <p>
            If You wish to use copyrighted material from the Service for your own purposes that go beyond fair use, You must obtain permission from the copyright owner.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Views Expressed Disclaimer</h2>
          <p>
            The Service may contain views and opinions which are those of the authors and do not necessarily reflect the official policy or position of any other author, agency, organization, employer or company, including the Company.
          </p>
          <p>
            Comments published by users are their sole responsibility and the users will take full responsibility, liability and blame for any libel or litigation that results from something written in or as a direct result of something written in a comment.
            The Company is not liable for any comment published by users and reserves the right to delete any comment for any reason whatsoever.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">No Responsibility Disclaimer</h2>
          <p>
            The information on the Service is provided with the understanding that the Company is not herein engaged in rendering legal, accounting, tax, or other professional advice and services.
            As such, it should not be used as a substitute for consultation with professional accounting, tax, legal or other competent advisers.
          </p>
          <p>
            In no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever arising out of or in connection with your access or use or inability to access or use the Service.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">"Use at Your Own Risk" Disclaimer</h2>
          <p>
            All information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information,
            and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.
          </p>
          <p>
            The Company will not be liable to You or anyone else for any decision made or action taken in reliance on the information given by the Service or for any consequential, special or similar damages, even if advised of the possibility of such damages.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, You can contact Us:
            <br />
            <span className="font-semibold">By email:</span> <a href="mailto:support@igramsaver.io" className="text-blue-600 underline">support@igramsaver.io</a>
          </p>
        </div>

      </div>
    </div>
  );
}



function Terms() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 text-black">Terms of Service</h1>
      <div className="space-y-7 text-gray-800 text-base leading-relaxed">

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Welcome to iGram Saver!</h2>
          <p>
            These terms and conditions outline the rules and regulations for the use of iGram Saver's Website, located at{' '}
            <a href="https://igramsaver.io" className="text-blue-600 underline" target="_blank" rel="noopener">https://igramsaver.io</a>.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. <span className="font-semibold">Do not continue to use iGram Saver if you do not agree to take all of the terms and conditions stated on this page.</span>
          </p>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Cookies</h2>
          <p>
            We employ the use of cookies. By accessing iGram Saver, you agreed to use cookies in agreement with the iGram Saver's Privacy Policy.
          </p>
          <p>
            Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">License</h2>
          <p>
            Unless otherwise stated, iGram Saver and/or its licensors own the intellectual property rights for all material on iGram Saver. All intellectual property rights are reserved. You may access this from iGram Saver for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p className="font-semibold mt-3">You must not:</p>
          <ul className="list-disc pl-6">
            <li>Republish material from iGram Saver</li>
            <li>Sell, rent or sub-license material from iGram Saver</li>
            <li>Reproduce, duplicate or copy material from iGram Saver</li>
            <li>Redistribute content from iGram Saver</li>
          </ul>
          <p>
            This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the{' '}
            <a href="https://www.termsandconditionsgenerator.com/" className="text-blue-600 underline" target="_blank" rel="noopener">Free Terms and Conditions Generator</a>.
          </p>
        </div>

        <div>
          <p>
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. iGram Saver does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of iGram Saver, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, iGram Saver shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
          </p>
          <p>
            iGram Saver reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
          </p>
          <p className="font-semibold mt-3">You warrant and represent that:</p>
          <ul className="list-disc pl-6">
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;</li>
            <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
          </ul>
          <p>
            You hereby grant iGram Saver a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Hyperlinking to our Content</h2>
          <p>The following organizations may link to our Website without prior written approval:</p>
          <ul className="list-disc pl-6">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
          </ul>
          <p>
            These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
          </p>
          <p>We may consider and approve other link requests from the following types of organizations:</p>
          <ul className="list-disc pl-6">
            <li>commonly-known consumer and/or business information sources;</li>
            <li>dot.com community sites;</li>
            <li>associations or other groups representing charities;</li>
            <li>online directory distributors;</li>
            <li>internet portals;</li>
            <li>accounting, law and consulting firms; and</li>
            <li>educational institutions and trade associations.</li>
          </ul>
          <p>
            We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of iGram Saver; and (d) the link is in the context of general resource information.
          </p>
          <p>
            These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
          </p>
          <p>
            If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to iGram Saver. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
          </p>
          <p>
            Approved organizations may hyperlink to our Website as follows:
          </p>
          <ul className="list-disc pl-6">
            <li>By use of our corporate name; or</li>
            <li>By use of the uniform resource locator being linked to; or</li>
            <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
          </ul>
          <p>
            No use of iGram Saver's logo or other artwork will be allowed for linking absent a trademark license agreement.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">iFrames</h2>
          <p>
            Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Content Liability</h2>
          <p>
            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Your Privacy</h2>
          <p>
            Please read our <a href="https://igramsaver.io/privacy-policy" className="text-blue-600 underline" target="_blank" rel="noopener">Privacy Policy</a>
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Reservation of Rights</h2>
          <p>
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Removal of links from our website</h2>
          <p>
            If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
          </p>
          <p>
            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Disclaimer</h2>
          <p>
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p>
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
          </p>
          <p>
            As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
          </p>
        </div>
      </div>
    </div>
  );
}





function Privacy() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 text-black">Privacy Policy</h1>
      <div className="space-y-7 text-gray-800 text-base leading-relaxed">

        <div>
          <p>
            At <span className="font-semibold">iGram Saver</span>, accessible from{' '}
            <a href="https://igramsaver.io" className="text-blue-600 underline" target="_blank" rel="noopener">
              https://igramsaver.io
            </a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by iGram Saver and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in iGram Saver. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">How we use your information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Log Files</h2>
          <p>
            iGram Saver follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Cookies and Web Beacons</h2>
          <p>
            Like any other website, iGram Saver uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –
            <a
              href="https://policies.google.com/technologies/ads"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener"
            >
              https://policies.google.com/technologies/ads
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Advertising Partners Privacy Policies</h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the advertising partners of iGram Saver.
          </p>
          <p>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on iGram Saver, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that iGram Saver has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Third Party Privacy Policies</h2>
          <p>
            iGram Saver's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </h2>
          <p>
            Under the CCPA, among other rights, California consumers have the right to:
          </p>
          <ul className="list-disc pl-6">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">GDPR Data Protection Rights</h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Children's Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            iGram Saver does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-2xl mb-2 text-purple-700">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, You can contact us:<br />
            <span className="font-semibold">By email:</span> <a href="mailto:support@igramsaver.io" className="text-blue-600 underline">support@igramsaver.io</a>
          </p>
        </div>

      </div>
    </div>
  );
}


// ===== Main App =====
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <HowToUse />
              <HowToDownload />
              <SkySection />
              <Testimonial />
              <FAQ />
            </>
          }
        />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}
