import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();

  const toolPlans = {
    ChatGPT: { Free: 0, Go: 4.2, Plus: 21.2, Pro: 113.3 },
    Claude: { Free: 0, Pro: 17, Max: 100 },
    Gemini: { Free: 0, 'AI Plus': 4.2, 'AI Pro': 20.7, 'AI Ultra': 68.9 },
    Cursor: { Free: 0, Pro: 20, Team: 40, Enterprise: 0 },
    'GitHub Copilot': { Free: 0, Pro: 10, 'Pro+': 39, Max: 100 },
    Perplexity: { Free: 0, Pro: 17, Max: 167 }
  };

  const [tool, setTool] = useState('ChatGPT');
  const [plan, setPlan] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [useCase, setUseCase] = useState('Writing');
  const [monthlyCost, setMonthlyCost] = useState('');

  const handleToolChange = (e) => {
    setTool(e.target.value);
    setPlan('');
    setMonthlyCost('');
  };

  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    setPlan(selectedPlan);
    const price = toolPlans[tool]?.[selectedPlan] ?? '';
    setMonthlyCost(price);
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, plan, teamSize, useCase, monthlyCost })
      });
      const data = await res.json();
      console.log('Response:', data);
      if (!res.ok) {
        alert('Error: ' + data.error);
        return;
      }
      navigate(`/audit/${data.id}`);
    } catch (err) {
      console.error('Error:', err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

        body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: none !important;
          border: none !important;
        }

        .form-container {
          font-family: 'Outfit', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          min-height: 100vh;
          width: 100vw;
          background-color: #F5EFE6;
        }

        .form-card {
          background: #F5EFE6;
          width: 100vw;
          min-height: 100vh;
          max-width: 100vw;
          padding: 60px 40px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          animation: fadeInUp 0.6s ease-out;
        }

        .form-content-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .eyebrow {
          color: #C8A882;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
          text-align: center;
        }

        .heading {
          color: #3B1F0E;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .label {
          color: #7B4A2D;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #C8A882;
          border-radius: 8px;
          background: #ffffff;
          color: #3B1F0E;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .input-field:focus {
          border-color: #7B4A2D;
          box-shadow: 0 0 0 3px rgba(123, 74, 45, 0.1);
        }

        .input-field-readonly {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #C8A882;
          border-radius: 8px;
          background: #F0E8DF;
          color: #7B4A2D;
          font-size: 15px;
          outline: none;
          box-sizing: border-box;
          cursor: not-allowed;
        }

        .btn-submit {
          width: 100%;
          background: #C8A882;
          color: #3B1F0E;
          font-weight: bold;
          font-size: 16px;
          padding: 14px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(200, 168, 130, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .btn-submit:hover {
          background: #7B4A2D;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(123, 74, 45, 0.4);
        }

        .btn-submit:active {
          transform: translateY(0);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .form-card { padding: 36px 24px; }
          .heading { font-size: 24px; margin-bottom: 24px; }
        }
      `}</style>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-content-wrapper">
          <div className="eyebrow">AUDIT YOUR AI SPEND</div>
          <h2 className="heading">Tell us about your AI tools</h2>

          {/* AI Tool */}
          <div className="form-group">
            <label className="label" htmlFor="ai-tool">AI Tool</label>
            <select
              id="ai-tool"
              className="input-field"
              value={tool}
              onChange={handleToolChange}
            >
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Gemini">Gemini</option>
              <option value="Cursor">Cursor</option>
              <option value="GitHub Copilot">GitHub Copilot</option>
              <option value="Perplexity">Perplexity</option>
            </select>
          </div>

          {/* Current Plan — dynamic based on tool */}
          <div className="form-group">
            <label className="label" htmlFor="current-plan">Current Plan</label>
            <select
              id="current-plan"
              className="input-field"
              value={plan}
              onChange={handlePlanChange}
            >
              <option value="">Select a plan</option>
              {Object.entries(toolPlans[tool] || {}).map(([planName, price]) => (
                <option key={planName} value={planName}>
                  {planName} (${price}/month)
                </option>
              ))}
            </select>
          </div>

          {/* Team Size */}
          <div className="form-group">
            <label className="label" htmlFor="team-size">Team Size</label>
            <input
              type="number"
              id="team-size"
              className="input-field"
              placeholder="e.g. 5"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </div>

          {/* Primary Use Case */}
          <div className="form-group">
            <label className="label" htmlFor="use-case">Primary Use Case</label>
            <select
              id="use-case"
              className="input-field"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
            >
              <option value="Writing">Writing</option>
              <option value="Coding">Coding</option>
              <option value="Design">Design</option>
              <option value="Research">Research</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Monthly Cost — readonly, auto filled */}
          <div className="form-group">
            <label className="label" htmlFor="monthly-cost">Monthly Cost ($)</label>
            <input
              type="number"
              id="monthly-cost"
              className="input-field-readonly"
              placeholder="Auto-filled when you select a plan"
              value={monthlyCost}
              readOnly
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Show Results →'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;