import { observable, action, decorate, runInAction } from "mobx"
import { API_KEY, API_URL } from "./Constant"
 
class Movie {
  details = []
  credits = []
  loaded = false
  recommendations = []
  fetchAll(id) {
    runInAction(() => {
      this.loaded = false
    })
    fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then(res => res.json())
      .then(res => {
        return (
          this.setDetails(res)
        )
    })

    fetch(
      `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(res => {
        this.setCredits(res)
      })

    fetch(
      `${API_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
    )
    .then(res => res.json())
    .then(res => (
      this.setRecommendations(res)
    ))
  }

  setDetails(data) {
    this.details = data
  }

  setCredits(data) {
    this.credits = data
  }

  setRecommendations(data) {
    this.recommendations = data
    this.loaded = true
  }
}

decorate(Movie, {
  details: observable,
  loaded: observable,
  setDetails: action,
})

let movieStore = new Movie()

export default movieStore