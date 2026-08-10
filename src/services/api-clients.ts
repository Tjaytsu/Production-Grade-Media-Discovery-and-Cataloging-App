import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTY1MTc3ZmY0OGZmMDg0ZjA0ZWIwNmZkMjFmNTA4MyIsIm5iZiI6MTc4NjMzNzYwOS40MTEsInN1YiI6IjZhNzk1OTQ5OTI3ZTk3YTRjNzkwZDQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JTpkvwreLuvZzrq8dB_1256qjTbzbjcjrudobrUXmbI",
  },
});

