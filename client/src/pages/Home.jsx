import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.jpg';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ width: '100vw', margin: 0, padding: 0 }}>
      {/* Embedded CSS Styling for Visual Excellence */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

        body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: none !important;
          border: none !important;
        }

        .home-container {
          font-family: 'Outfit', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: #ffffff;
          color: #3B1F0E;
          min-height: 100vh;
          width: 100vw;
        }



        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center center;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }

        .glass-card {
          position: relative;
          z-index: 2;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(200, 168, 130, 0.4);
          border-radius: 16px;
          padding: 56px 64px;
          max-width: 680px;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          animation: fadeInUp 0.8s ease-out;
        }

        .eyebrow {
          color: #C8A882;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .headline {
          color: #3B1F0E;
          font-size: 48px;
          font-family: Georgia, serif;
          font-weight: bold;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .subtext {
          color: #7B4A2D;
          font-size: 18px;
          font-weight: 300;
          margin-bottom: 36px;
          line-height: 1.5;
        }

        .btn-get-started {
          background: #C8A882;
          color: #3B1F0E;
          font-weight: bold;
          font-size: 16px;
          padding: 14px 40px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(200, 168, 130, 0.3);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          outline: none;
        }

        .btn-get-started:hover {
          background: #7B4A2D;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(123, 74, 45, 0.5);
        }

        .btn-get-started:active {
          transform: translateY(0);
        }

        .features-section {
          background: #ffffff;
          padding: 80px 40px;
          text-align: center;
          box-sizing: border-box;
        }

        .features-heading {
          font-family: Georgia, serif;
          color: #3B1F0E;
          font-size: 32px;
          margin-bottom: 48px;
          font-weight: bold;
        }

        .features-grid {
          display: flex;
          gap: 32px;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #E8DDD4;
          border-radius: 12px;
          padding: 36px;
          max-width: 280px;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(59, 31, 14, 0.08);
          border-color: #C8A882;
        }

        .feature-emoji {
          font-size: 36px;
          display: block;
          margin-bottom: 12px;
        }

        .feature-title {
          font-family: Georgia, serif;
          color: #3B1F0E;
          font-size: 18px;
          margin: 12px 0 8px;
          font-weight: bold;
        }

        .feature-text {
          color: #7B4A2D;
          font-size: 14px;
          line-height: 1.5;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .glass-card {
            padding: 40px 24px;
          }
          .headline {
            font-size: 36px;
          }
          .features-section {
            padding: 60px 20px;
          }
        }
      `}</style>



      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
        <div className="glass-card">
          <div className="eyebrow">YOUR PERSONAL AI AUDITOR</div>
          <h1 className="headline">Is Your AI Stack Costing You More Than It Should?</h1>
          <p className="subtext">Paste your subscriptions. Get a smart audit in seconds.</p>
          <button className="btn-get-started" onClick={() => navigate('/form')}>
            Get Started →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-heading">Everything you need to audit smarter</h2>
        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <span className="feature-emoji" role="img" aria-label="Detects Overspending">🔍</span>
            <h3 className="feature-title">Detects Overspending</h3>
            <p className="feature-text">See exactly where your money is going</p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <span className="feature-emoji" role="img" aria-label="Plan Recommendations">📊</span>
            <h3 className="feature-title">Plan Recommendations</h3>
            <p className="feature-text">Get smarter plan suggestions instantly</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <span className="feature-emoji" role="img" aria-label="Shareable Reports">🔗</span>
            <h3 className="feature-title">Shareable Reports</h3>
            <p className="feature-text">Share your audit with one link</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
