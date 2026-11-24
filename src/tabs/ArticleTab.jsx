import Panel from '../components/Panel.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

export default function ArticleTab() {
  const { ui, content } = useLanguage();
  const t = ui.article;
  const sections = content.articleSections;

  return (
    <Panel>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-ink-900">{t.title}</h2>
        <p className="mx-auto max-w-3xl text-gray-800">{t.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="rounded-card bg-primary-500 grid-lines p-6 text-white shadow-card-lg">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            {t.sequence}
          </p>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-start gap-3 rounded-card border border-white/10 bg-white/5 px-3 py-3"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-400/20 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{section.title}</p>
                  <p className="text-xs leading-relaxed text-white">{section.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <article
                key={section.id}
                className="rounded-card border border-gray-300 bg-white p-5 shadow-card-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-card bg-white p-3 text-primary-400 shadow-card-sm">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-800">
                        {t.section(index + 1)}
                      </p>
                      <h3 className="text-lg font-semibold text-ink-900">{section.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-800">{section.summary}</p>

                <div className="rounded-card border border-primary-300/45 bg-white p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
                    {t.includes}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-800">{section.includes}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
