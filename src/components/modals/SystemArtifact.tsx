import BaseModal from './BaseModal';
import { SYSTEM_ARTIFACT_ARTICLE_URL, SYSTEM_ARTIFACT_LINK_LABEL } from '../../lib/config';

interface Props {
  onClose: () => void;
}

export default function SystemArtifact({ onClose }: Props) {
  return (
    <BaseModal title="System Artifact" onClose={onClose}>
      <div className="space-y-3 mb-8">
        <p style={{ color: 'var(--text-secondary)' }}>You're just as curious as I am.</p>
        <p style={{ color: 'var(--text-secondary)' }}>Most people ignore that instinct.</p>
        <p style={{ color: 'var(--text-secondary)' }}>You didn't.</p>
      </div>

      <div className="mb-8">
        <a
          href={SYSTEM_ARTIFACT_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm underline underline-offset-4 transition-colors"
          style={{
            color: 'var(--interaction)',
            textDecorationColor: 'rgba(79,1,71,0.25)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = 'rgba(79,1,71,0.45)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = 'rgba(79,1,71,0.25)';
          }}
        >
          {SYSTEM_ARTIFACT_LINK_LABEL}
          <span aria-hidden="true" className="text-xs" style={{ opacity: 0.7 }}>
            ↗
          </span>
        </a>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg border text-sm font-medium tracking-wide transition-all duration-200"
          style={{
            background: 'rgba(58,1,92,0.06)',
            borderColor: 'rgba(58,1,92,0.18)',
            color: 'var(--text)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(58,1,92,0.10)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(58,1,92,0.06)';
          }}
        >
          Close
        </button>
      </div>
    </BaseModal>
  );
}
