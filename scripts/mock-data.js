const MOCK_VIDEOS = [
  {
    id: 1,
    city: "Пятки зевают",
    description: "Когда тебе к первой паре",
    time_of_day: "morning",
    thumbnail: { url: "https://i.pinimg.com/736x/e0/b1/f6/e0b1f64451eba7053676fb75e40cc617.jpg" },
    poster: { url: "https://i.pinimg.com/736x/e0/b1/f6/e0b1f64451eba7053676fb75e40cc617.jpg" },
    video: { url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  },
  {
    id: 2,
    city: "Собака с Colgate",
    description: "Впервые купил что-то вместо SPLAT",
    time_of_day: "afternoon",
    thumbnail: { url: "https://i.pinimg.com/736x/83/8a/e0/838ae0588626b5f247f64bb0338e638c.jpg" },
    poster: { url: "https://i.pinimg.com/736x/83/8a/e0/838ae0588626b5f247f64bb0338e638c.jpg" },
    video: { url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  },
  {
    id: 3,
    city: "Кот. Взрыв. ААА.",
    description: "Когда надо написать курсач за 3 дня",
    time_of_day: "night",
    thumbnail: { url: "https://i.pinimg.com/736x/88/f5/7b/88f57baee4eec81aa5b50b711a9b6cb2.jpg" },
    poster: { url: "https://i.pinimg.com/736x/88/f5/7b/88f57baee4eec81aa5b50b711a9b6cb2.jpg" },
    video: { url: "https://www.w3schools.com/html/movie.mp4" },
  },
  {
    id: 4,
    city: "Орешке",
    description: "АХАХАХАХАХАХ",
    time_of_day: "morning",
    thumbnail: { url: "https://i.pinimg.com/736x/e7/33/6b/e7336b9dda9ed164532e6be9253ce868.jpg" },
    poster: { url: "https://i.pinimg.com/736x/e7/33/6b/e7336b9dda9ed164532e6be9253ce868.jpg" },
    video: { url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  },
  {
    id: 5,
    city: "Я ем цемент",
    description: "Вот это информация, спасибо",
    time_of_day: "afternoon",
    thumbnail: { url: "https://i.pinimg.com/736x/98/bc/7e/98bc7e77a24db9b35e142e74660db3d2.jpg" },
    poster: { url: "https://i.pinimg.com/736x/98/bc/7e/98bc7e77a24db9b35e142e74660db3d2.jpg" },
    video: { url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
  },
];

function getMockData(requestUrl) {
  const url = new URL(requestUrl);
  const city = url.searchParams.get("filters[city][$containsi]") || "";
  const time = url.searchParams.getAll("filters[time_of_day][$eqi]");
  const pageSize = Number(url.searchParams.get("pagination[pageSize]")) || 5;
  const page = Number(url.searchParams.get("pagination[page]")) || 1;

  const filtered = MOCK_VIDEOS.filter((item) => {
    const cityOk = !city || item.city.toLowerCase().includes(city.toLowerCase());
    const timeOk = !time.length || time.includes(item.time_of_day);
    return cityOk && timeOk;
  });

  return {
    results: filtered.slice((page - 1) * pageSize, page * pageSize),
    pagination: { page: 1, pageCount: 1, pageSize, total: filtered.length },
  };
}

async function renderMockData(requestUrl) {
  const data = getMockData(requestUrl);
  console.warn("Сервер недоступен — показаны демо-данные из mock-data.js");

  cardsOnPageState = data.results;

  appendCards({
    baseUrl: "",
    dataArray: data.results,
    cardTmp,
    container: cardsList,
  });

  setVideo({
    baseUrl: "",
    video: videoElement,
    videoUrl: data.results[0].video.url,
    posterUrl: data.results[0].poster.url,
  });

  document
    .querySelectorAll(".content__card-link")[0]
    .classList.add("content__card-link_current");

  await waitForReadyVideo(videoElement);
  await delay(preloaderWaitindTime);
  removePreloader(videoContainer, ".preloader");
  removePreloader(cardsContainer, ".preloader");

  cardsContainer.classList.add("custom-scrollbar");

  chooseCurrentVideo({
    baseUrl: "",
    videoData: cardsOnPageState,
    cardLinksSelector: ".content__card-link",
    currentLinkClassName: "content__card-link_current",
    mainVideo: videoElement,
  });
}
