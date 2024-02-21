import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'api/api';
import { MyLoader } from './Loader/Loader';
import { LoadMoreButton } from './Buttons/LoadMore';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    isMore: false,
    error: null,
    currentPage: 1,
  };

  // componentDidUpdate(prevState) {
  //   if (
  //     this.state.currentPage !== prevState.currentPage ||
  //     this.state.query !== prevState.query
  //   ) {
  //     this.handleLoadMore();
  //   }
  // }

  handlerSearch = async query => {
    if (query === '') {
      return;
    }
    this.setState({ query, isLoading: true, currentPage: 1 });
    try {
      const { hits, totalHits } = await getImages(query);
      if (!totalHits) {
        this.setState({ images: [], isMore: false });
        return;
      }
      this.setState(prevState => ({
        images: hits,
        currentPage: prevState.currentPage + 1,
        isMore: true,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = async () => {
    const { currentPage, query, images } = this.state;
    let total;

    try {
      const { hits, totalHits } = await getImages(query, currentPage);
      total = totalHits;
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    }
    if (total <= images.length + 12) {
      this.setState({ isMore: false });
    }
  };

  render() {
    const { images, isLoading, isMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlerSearch} />
        {isLoading ? <MyLoader /> : <ImageGallery images={images} />}
        {isMore && <LoadMoreButton onClick={this.handleLoadMore} />}
      </>
    );
  }
}
