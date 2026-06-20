import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Audit() {
  const { id } = useParams();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/audit/${id}`);
        if (!res.ok) throw new Error('Audit not found');
        const data = await res.json();
        setAudit(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAudit();
  }, [id]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const getStatusConfig = (spendStatus) => {
    switch (spendStatus) {
      case 'overspending': return { emoji: '🔴', label: 'Overspending', color: '#C0392B', bg: '#FDECEA' };
      case 'underspending': return { emoji: '🟡', label: 'Needs Upgrade', color: '#B7770D', bg: '#FEF9EC' };
      case 'optimal': return { emoji: '🟢', label: 'Optimal Plan', color: '#1E7B45', bg: '#EAFAF1' };
      default: return { emoji: '⚪', label: 'Unknown', color: '#999', bg: '#f5f5f5' };
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F5EFE6', fontFamily: 'Outfit, sans-serif', color: '#7B4A2D', fontSize: '18px' }}>Generating your audit report...</div>;
  if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F5EFE6', fontFamily: 'Outfit, sans-serif', color: '#C0392B', fontSize: '18px' }}>❌ {error}</div>;

  const spendStatus = audit.savings > 0 ? 'overspending' : audit.savings < 0 ? 'underspending' : 'optimal';
  const status = getStatusConfig(spendStatus);
  let message = '';
  if (spendStatus === 'overspending') {
    message = `You're overspending by $${Math.abs(audit.savings).toFixed(2)}/month on ${audit.tool}. Downgrading to the ${audit.recommendation} plan will save you $${Math.abs(audit.savings * 12).toFixed(2)} yearly.`;
  } else if (spendStatus === 'underspending') {
    message = `You're underpaying for your current needs. Upgrading to the ${audit.recommendation} plan costs $${Math.abs(audit.savings).toFixed(2)}/month more (+$${Math.abs(audit.savings * 12).toFixed(2)}/year), but it's the right fit for your team size and use case.`;
  } else {
    message = `You're on the perfect plan! ${audit.recommendation} is exactly right for your ${audit.useCase} work with a team of ${audit.teamSize}.`;
  }
  const yearlyCurrentSpend = audit.monthlyCost * 12;
  const recommendedMonthlyCost = audit.monthlyCost - audit.savings;
  const yearlyRecommendedSpend = recommendedMonthlyCost * 12;
  const yearlySavings = audit.savings * 12;

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", margin: 0, padding: 0, minHeight: '100vh', width: '100vw', backgroundColor: '#F5EFE6' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');
        body, #root { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: none !important; }

        .detail-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; margin-bottom: 28px; }
        .detail-box { background: #ffffff; border: 1px solid #C8A882; border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; }
        .detail-box-label { color: #7B4A2D; font-size: 11px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; }
        .detail-box-value { color: #3B1F0E; font-size: 18px; font-weight: 600; }

        .breakdown-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #F0E8DF; font-size: 15px; color: #3B1F0E; }
        .breakdown-row:last-child { border-bottom: none; font-weight: 700; font-size: 16px; }

        .btn-copy { width: 100%; background: #C8A882; color: #3B1F0E; font-weight: bold; font-size: 16px; padding: 14px; border-radius: 50px; border: none; cursor: pointer; margin-top: 8px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 12px rgba(200,168,130,0.3); display: flex; justify-content: center; align-items: center; font-family: 'Outfit', sans-serif; }
        .btn-copy:hover { background: #7B4A2D; color: #ffffff; transform: translateY(-1px); box-shadow: 0 6px 15px rgba(123,74,45,0.4); }
        .btn-copy:active { transform: translateY(0); }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 576px) { .detail-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div style={{ width: '100vw', minHeight: '100vh', padding: '60px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.6s ease-out' }}>
        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>

          {/* Eyebrow + Heading */}
          <div style={{ color: '#C8A882', fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>YOUR AUDIT REPORT</div>
          <h2 style={{ color: '#3B1F0E', fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 'bold', textAlign: 'center', marginBottom: '36px' }}>Here's what we found</h2>

          {/* Detail Boxes */}
          <div className="detail-grid">
            <div className="detail-box"><span className="detail-box-label">AI Tool</span><span className="detail-box-value">{audit.tool}</span></div>
            <div className="detail-box"><span className="detail-box-label">Current Plan</span><span className="detail-box-value">{audit.plan}</span></div>
            <div className="detail-box"><span className="detail-box-label">Team Size</span><span className="detail-box-value">{audit.teamSize} people</span></div>
            <div className="detail-box"><span className="detail-box-label">Use Case</span><span className="detail-box-value">{audit.useCase}</span></div>
            <div className="detail-box"><span className="detail-box-label">Monthly Cost</span><span className="detail-box-value">${audit.monthlyCost}/mo</span></div>
            <div className="detail-box"><span className="detail-box-label">Yearly Cost</span><span className="detail-box-value">${yearlyCurrentSpend}/yr</span></div>
          </div>

          {/* Status Card */}
          <div style={{ borderRadius: '12px', padding: '20px 24px', marginBottom: '24px', background: status.bg, border: `1px solid ${status.color}44` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{status.emoji}</span>
              <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: status.color }}>{status.label}</span>
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#3B1F0E', margin: 0 }}>{message}</p>
          </div>

          {/* Recommended Plan */}
          <div style={{ background: '#F0E8DF', border: '1px solid #C8A882', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#7B4A2D', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Recommended Plan</span>
            <span style={{ color: '#3B1F0E', fontSize: '16px', fontWeight: 700 }}>✦ {audit.recommendation}</span>
          </div>

          {/* Spend Breakdown */}
          <div style={{ background: '#ffffff', border: '1px solid #C8A882', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <div style={{ color: '#7B4A2D', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Spend Breakdown</div>
            <div className="breakdown-row"><span style={{ color: '#5C3D2E' }}>Current monthly cost</span><span>${audit.monthlyCost}/mo</span></div>
            <div className="breakdown-row"><span style={{ color: '#5C3D2E' }}>Recommended plan cost</span><span>${recommendedMonthlyCost}/mo</span></div>
            <div className="breakdown-row"><span style={{ color: '#5C3D2E' }}>Current yearly spend</span><span>${yearlyCurrentSpend}/yr</span></div>
            <div className="breakdown-row"><span style={{ color: '#5C3D2E' }}>Recommended yearly spend</span><span>${yearlyRecommendedSpend}/yr</span></div>
            <div className="breakdown-row">
              <span style={{ color: '#5C3D2E' }}>{audit.savings >= 0 ? 'Yearly savings' : 'Extra yearly cost'}</span>
              <span style={{ color: audit.savings > 0 ? '#1E7B45' : audit.savings < 0 ? '#C0392B' : '#3B1F0E', fontWeight: 700 }}>
                {audit.savings >= 0 ? `$${yearlySavings} saved` : `+$${Math.abs(yearlySavings)}`}
              </span>
            </div>
          </div>

          {/* AI Summary */}
          <div style={{ background: '#ffffff', border: '1px solid #C8A882', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ color: '#7B4A2D', fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>✦ AI Analysis</div>
            <p style={{ color: '#3B1F0E', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>{audit.summary}</p>
          </div>

          {/* Copy URL Button */}
          <button className="btn-copy" onClick={handleCopyUrl}>
            {copied ? '✓ Link Copied!' : '🔗 Copy Report Link'}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Audit;
