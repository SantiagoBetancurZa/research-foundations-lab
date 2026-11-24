import Panel from '../components/Panel.jsx';
import { useLanguage } from '../i18n/LanguageContext.js';

export default function ArticleTab() {
  const { ui, content } = useLanguage();
  const t = ui.article;
  const sections = content.articleSections;

  return (
    <Panel>
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">{t.title}</h2>
        <p className="mx-auto max-w-3xl text-gray-600">{t.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
            {t.sequence}
          </p>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
              >
                <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-400/20 text-xs font-bold text-indigo-100">
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{section.title}</p>
                  <p className="text-xs leading-relaxed text-slate-300">{section.summary}</p>
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
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white p-3 text-indigo-700 shadow-sm">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                        {t.section(index + 1)}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-700">{section.summary}</p>

                <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
                    {t.includes}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">{section.includes}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
