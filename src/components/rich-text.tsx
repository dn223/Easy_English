/** Texto con `*resaltado*`: se usa para marcar palabras en inglés dentro de explicaciones en español. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, index) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <strong key={index} className="font-semibold text-navy-900">
            {part.slice(1, -1)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
