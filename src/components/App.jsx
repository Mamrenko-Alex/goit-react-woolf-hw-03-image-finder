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
    error: null,
  };

  handlerSearch = async query => {
    if (query === '') {
      return;
    }
    this.setState({ query, isLoading: true });
    try {
      const { hits, total, totalHits } = await getImages(query);
      if (!hits.length) {
        return;
      }
      this.setState(prevState => ({
        images: hits,
        currentPage: prevState.currentPage + 1,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
      console.log(this.state);
    }
  };

  handleLoadMore() {}

  render() {
    const { images, isLoading, available } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handlerSearch} />
        {isLoading ? <MyLoader /> : <ImageGallery images={images} />}
        {available !== 0 && <LoadMoreButton onClick={this.handleLoadMore} />}
      </>
    );
  }
}
