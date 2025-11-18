/* ===== Transcripción RA1 ===== */
let transcripcionVisible = false;
let textoCargado = "";

function toggleTranscripcion() {
  const cont = document.getElementById("transcripcion");
  const txt = document.getElementById("texto-transcripcion");
  const loader = document.getElementById("loader");

  if (!transcripcionVisible) {
    if (!textoCargado) {
      loader.style.display = "block";
      txt.textContent = "";
      fetch("docs/transcripcion_ra1.txt")
        .then(r => r.text())
        .then(d => {
          textoCargado = d.trim();
          txt.textContent = textoCargado;
          loader.style.display = "none";
        })
        .catch(() => {
          loader.style.display = "none";
          txt.textContent = "⚠ No se pudo cargar la transcripción.";
        });
    }

    cont.style.display = "block";
    cont.style.opacity = 1;
  } else {
    cont.style.display = "none";
  }

  transcripcionVisible = !transcripcionVisible;
}

function descargarTranscripcion() {
  fetch("docs/transcripcion_ra1.txt")
    .then(r => r.text())
    .then(data => {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "transcripcion_RA1.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    })
    .catch(() => alert("⚠ No se pudo descargar la transcripción."));
}

/* ===== Vista previa PDF ===== */
let pdfActual = "";

function verPDF(nombreArchivo) {
  pdfActual = nombreArchivo;
  const prev = document.getElementById("pdf-preview");
  const frame = document.getElementById("pdf-frame");

  frame.src = "docs/" + encodeURIComponent(nombreArchivo) + "#toolbar=0";
  prev.style.display = "block";

  window.scrollTo({ top: prev.offsetTop - 50, behavior: "smooth" });
}

function cerrarPDF() {
  const p = document.getElementById("pdf-preview");
  const f = document.getElementById("pdf-frame");
  f.src = "";
  p.style.display = "none";
}

function descargarPDFActual() {
  if (pdfActual) descargar(pdfActual);
}
