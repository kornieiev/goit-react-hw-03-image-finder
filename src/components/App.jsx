import React, { Component } from 'react';
import Loader from 'components/Loader/Loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import fetchPhotos from '../components/services/searchPhoto-api';
import css from './App.module.css';

export class App extends Component {
  state = {
    inputValue: '', // значение ввода инпута
    loading: false, // статус отображения загружчика
    images: [], // данные из Api
    error: null, // статус ошибки
    showModal: false, // статус отображения модалки
    largeImageURL: 0, // id выбранного фото
    totalPhotos: 0, // всего фото в коллекции
    showLoadMore: false, // статус отображения кнопки LoadMore
    page: 1, // страница загрузки с Api
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.inputValue;
    const nextSearch = this.state.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({ loading: true, showLoadMore: false });
      fetchPhotos(nextSearch, nextPage)
        .then(data => {
          this.setState({ totalPhotos: data.total });
          if (data.total < 1) {
            this.setState({ error: true });
            toast.info('УПС! 🫤 Відсутні фото за Вашим пошуком 🤷🏻');
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              totalPhotos: data.total,
              loading: false,
            }));

            if (data.hits.length >= data.total) {
            } else {
              this.toggleLoadMore();
            }
          }
        })
        .catch(error => {
          console.log(error);
          console.error('There was a problem with the fetch operation:', error);
          this.setState({ error });
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  }
  toggleLoadMore = () => {
    this.setState(({ showLoadMore }) => ({
      showLoadMore: !showLoadMore,
    }));
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.input.value;
    if (searchValue.trim() === '') {
      toast.warn('УПС! 🫤 Введіть значення для пошуку ⌨️ ');
      return;
    } else {
      this.setState({
        inputValue: searchValue,
        loading: true,
        images: [],
        page: 1,
        showLoadMore: false,
      });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  currentPhoto = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
    this.toggleModal();
  };

  renderMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  render() {
    const {
      loading,
      images,
      showModal,
      largeImageURL,
      totalPhotos,
      showLoadMore,
    } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {loading && <Loader />}

        <ImageGallery images={images} onClick={this.currentPhoto} />

        {totalPhotos > images.length && showLoadMore && (
          <Button onClick={this.renderMore}>Load more</Button>
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
          ></Modal>
        )}
      </div>
    );
  }
}

export default App;
