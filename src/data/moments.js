const R2 = import.meta.env.VITE_R2_PUBLIC_BASE;
const r2 = (key, options = {}) => {
  const { width = 800, format = "webp" } = options;
  const base = (R2 || "").replace(/\/$/, "");
  const file = key.replace(/^\//, "");

  // Use R2 image transformations here if your setup supports it:
  // return `${base}/${file}?width=${width}&format=${format}`;
  void width;
  void format;

  return base ? `${base}/${file}` : file;
};

export const moments = [
  {
    id: 1,
    title: "Nuestros Inicios",
    deseo: "Gracias por cuidarnos desde el principio. Tu amor fue el primer hogar que conoci.",
    img: r2("15septiembre.jpg", { width: 800 }),
    color: "#FFD1DC",
    x: 20,
    y: 80,
    fallDx: -10,
    spotifyTrackId: "16kJ8NqNdHbwJe9kf1TJLe",
  },
  {
    id: 2,
    title: "Tu Fuerza",
    deseo: "Que tu fuerza siempre se sienta ligera. Tu has sostenido mas de lo que el mundo ve.",
    img: r2("2doaño-15septiembre.jpg", { width: 800 }),
    color: "#AEC6CF",
    x: 22,
    y: 50,
    fallDx: 6,
    spotifyTrackId: "3T07pNAEVr9adeIG9i1ex4",
  },
  {
    id: 3,
    title: "Tu Sabiduria",
    deseo: "Que tu calma siga guiandonos. Tu voz es brujula y abrazo.",
    img: r2("cine.jpg", { width: 800 }),
    color: "#B2F2BB",
    x: 25,
    y: 20,
    fallDx: -4,
    spotifyTrackId: "0SRddBTphQwQcfqw4Br1uX",
  },
  {
    id: 4,
    title: "Dulce Hogar",
    deseo: "Que nuestra casa siga oliendo a ti: a paz, a cuidado, a vida.",
    img: r2("fiesta-reciente.jpg", { width: 800 }),
    color: "#FDFD96",
    x: 35,
    y: 40,
    fallDx: 12,
    spotifyTrackId: "3vxsXUUU9jUJrGNP4APtj3",
  },
  {
    id: 5,
    title: "Amor Infinito",
    deseo: "Que nunca te falte amor... del que das y del que mereces recibir.",
    img: r2("fiesta.jpg", { width: 800 }),
    color: "#E0BBE4",
    x: 50,
    y: 60,
    fallDx: -14,
    spotifyTrackId: "6lanRgr6wXibZr8KgzXxBl",
  },
  {
    id: 6,
    title: "Tu Sonrisa",
    deseo: "Que tu sonrisa siga iluminando lo cotidiano. Eres luz real.",
    img: r2("navidad.jpg", { width: 800 }),
    color: "#FFB7B2",
    x: 65,
    y: 40,
    fallDx: 8,
    spotifyTrackId: "2JBs412fpVUuzIaIp3CyIs",
  },
  {
    id: 7,
    title: "Complicidad",
    deseo: "Gracias por entenderme incluso cuando no se explicarme.",
    img: r2("restaurante.jpg", { width: 800 }),
    color: "#B2E2F2",
    x: 75,
    y: 20,
    fallDx: -6,
    spotifyTrackId: "6kdCN6gTWLcLxmLXoUcwuI",
  },
  {
    id: 8,
    title: "Aventuras",
    deseo: "Que la vida te regale momentos ligeros, de esos que se quedan brillando.",
    img: r2("salida.jpg", { width: 800 }),
    color: "#C5E1A5",
    x: 78,
    y: 50,
    fallDx: 10,
    spotifyTrackId: "3QHMxEOAGD51PDlbFPHLyJ",
  },
  {
    id: 9,
    title: "Tu Legado",
    deseo: "Tu amor se volvio costumbre bonita en mi. Eso es legado.",
    img: r2("salidacomer.jpg", { width: 800 }),
    color: "#FFD8B1",
    x: 80,
    y: 80,
    fallDx: -12,
    spotifyTrackId: "0UKSse3fcKetDzXnXzE1Pv",
  },
  {
    id: 10,
    title: "Para Ti",
    deseo: "Toca una estrella para descubrir un deseo.",
    img: r2("vistaDown.jpg", { width: 800 }),
    color: "#D1D1D1",
    x: 50,
    y: 25,
    fallDx: 0,
    isGuide: true,
    spotifyTrackId: "5bEn5VKDd0sD1uL2ZRCM05",
  },
];

