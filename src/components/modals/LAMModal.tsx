import { useState } from 'react';
import BaseModal from './BaseModal';
import { getDeviceId } from '../../lib/deviceId';
import {
  getTop5,
  getTodaySubmit,
  submitToLeaderboard,
  type LeaderboardEntry,
} from '../../lib/leaderboard';

interface Props {
  elapsedSeconds: number;
  onClose: () => void;
}

export default function LAMModal({ elapsedSeconds, onClose }: Props) {
  const deviceId = getDeviceId();
  const todaySubmit = getTodaySubmit(deviceId);
  const alreadySubmitted = todaySubmit !== null && todaySubmit.time <= elapsedSeconds;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [top5, setTop5] = useState<LeaderboardEntry[]>(() => getTop5());

  function handleSubmit() {
    const result = submitToLeaderboard(deviceId, elapsedSeconds, displayName, email || undefined);
    if (result.success) {
      setSubmittedName(result.displayName);
      setSubmitted(true);
      setTop5(getTop5());
    }
  }

  return (
    <BaseModal title="LAM" onClose={onClose}>
      {/* Timer copy */}
      <div className="space-y-2 mb-6">
        <p style={{ color: 'var(--text-secondary)' }}>
          You made it here in{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{elapsedSeconds}</span> seconds.
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>Most people skim. You read the fine print.</p>
        <p style={{ color: 'var(--text-secondary)' }}>Leave your mark on the leaderboard.</p>
      </div>

      {/* Leaderboard preview */}
      {top5.length > 0 && (
        <div className="mb-6">
          <p className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>
            Top 5 Fastest
          </p>
          <div className="space-y-2">
            {top5.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm py-2 px-3 rounded-lg border"
                style={{
                  background: 'rgba(255,250,246,0.72)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium w-4" style={{ color: 'var(--text-muted)' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text)' }}>{entry.displayName}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--interaction)' }}>
                  {entry.time}s
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission form */}
      {submitted ? (
        <div className="py-4 text-center space-y-1">
          <p style={{ color: 'var(--interaction)', fontWeight: 600 }}>Mark left.</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            You're on the board as <span style={{ color: 'var(--text)' }}>{submittedName}</span>.
          </p>
        </div>
      ) : alreadySubmitted ? (
        <p className="text-sm text-center py-2" style={{ color: 'var(--text-muted)' }}>
          You already left a mark today.
        </p>
      ) : (
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name (optional)"
              className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
              style={{
                background: 'rgba(255,250,246,0.72)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border-strong)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border)';
              }}
            />
            <p className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
              Leave blank to post as SNOOP##.
            </p>
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
              style={{
                background: 'rgba(255,250,246,0.72)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border-strong)';
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = 'var(--border)';
              }}
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg border text-sm font-medium tracking-wide transition-all duration-200"
              style={{
                background: 'var(--accent)',
                borderColor: 'var(--border)',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(95,33,77,0.92)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
              }}
            >
              Leave your mark
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
