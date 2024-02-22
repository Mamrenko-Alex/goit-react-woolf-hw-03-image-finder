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

  async componentDidUpdate(prevProps, prevState) {
    const { currentPage, query, images } = this.state;
    const { currentPage: prevPage, query: prevQuery } = prevState;
    let total;

    if (images.length === 0) {
      return;
    }
    if (currentPage !== prevPage || query !== prevQuery) {
      try {
        const { hits, totalHits } = await getImages(query, currentPage);
        total = totalHits;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        this.setState({ error });
      }
    }
    if (total <= images.length + 12) {
      this.setState({ isMore: false });
    }
  }

  handlerSearch = async query => {
    if (query === '' || query === this.state.query) {
      return;
    }
    this.setState({ query, isLoading: true, currentPage: 1, images: [] });
    try {
      const { hits, totalHits } = await getImages(query);
      this.setState({
        images: [...hits],
        isMore: totalHits > 12,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, isLoading, isMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlerSearch} />
        <span id="js_anchor"></span>
        {isLoading && <MyLoader />}
        {images.length > 0 && <ImageGallery images={images} />}
        {isMore && <LoadMoreButton onClick={this.handleLoadMore} />}
      </>
    );
  }
}
