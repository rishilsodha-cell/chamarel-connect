/**
 * Posts a set of values to a Google Form.
 *
 * Google Forms sends no CORS headers, so `fetch` cannot read the result and
 * `mode: "no-cors"` would resolve even when nothing arrived. A real form POST
 * targeting a hidden iframe is the only option that gives any success signal
 * at all: the iframe's load event fires once Google has answered. That is a
 * weaker guarantee than a parsed response, so anything that does not load
 * inside `timeoutMs` is reported as a failure rather than quietly treated as
 * sent — the caller is expected to show the phone number and email instead.
 */
export function submitToGoogleForm(
  action: string,
  values: Record<string, string | undefined>,
  timeoutMs = 12000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const name = `gform-${Math.random().toString(36).slice(2)}`;

    const iframe = document.createElement("iframe");
    iframe.name = name;
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.action = action;
    form.method = "POST";
    form.target = name;
    form.style.display = "none";

    Object.entries(values).forEach(([field, value]) => {
      if (value === undefined || value === null || value === "") return;
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field;
      input.value = value;
      form.appendChild(input);
    });

    let submitted = false;
    let settled = false;

    const cleanup = () => {
      window.clearTimeout(timer);
      iframe.remove();
      form.remove();
    };

    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("Timed out waiting for Google Forms"));
    }, timeoutMs);

    iframe.addEventListener("load", () => {
      // Browsers fire a load for the iframe's initial about:blank document.
      // Only a load after the POST means anything.
      if (!submitted || settled) return;
      settled = true;
      cleanup();
      resolve();
    });

    document.body.appendChild(iframe);

    // Queued after the about:blank load so the guard above is reached first.
    window.setTimeout(() => {
      document.body.appendChild(form);
      submitted = true;
      form.submit();
    }, 0);
  });
}
