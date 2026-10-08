<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep the portfolio as one anchor-navigated index route because the brief explicitly requires a single scrolling page.
- Store project content in a reusable data module and label illustrative concepts honestly because no verified project records or URLs were supplied.
- Lazy-load the React Three Fiber globe after its section approaches the viewport, behind a browser hydration guard and an error boundary, to preserve SSR safety and initial-load performance.
- Define presentation styles and semantic monochrome tokens in the global stylesheet and use shared Button variants for commands to preserve design consistency.
- Keep résumé-derived experience and certification content in the shared portfolio data module so factual profile content stays reusable and easy to update.
