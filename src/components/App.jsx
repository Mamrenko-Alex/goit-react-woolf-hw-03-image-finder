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
    const { currentPage, query } = this.state;
    const { currentPage: prevPage, query: prevQuery } = prevState;

    if (currentPage === prevPage && query === prevQuery) {
      return;
    }
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await getImages(query, currentPage);

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        isMore: currentPage < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handlerSearch = async query => {
    if (query === this.state.query) {
      return;
    }
    this.setState({
      query,
      images: [],
      isLoading: false,
      isMore: false,
      error: null,
      currentPage: 1,
    });
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
