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
    currentImgInd: 0, // id выбранного фото
    totalPhotos: 0, // всего фото в коллекции
    showLoadMore: false, // статус отображения кнопки LoadMore
    page: 1, // страница загрузки с Api
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.inputValue;
    const nextSearch = this.state.inputValue;

    const page = this.state.page;

    if (prevSearch !== nextSearch || prevState.page !== this.state.page) {
      this.setState({ loading: true, images: [] });

      fetchPhotos(nextSearch, page)
        .then(data => {
          console.log('data', data);
          console.log('data.total', data.total);

          this.setState({ totalPhotos: data.total });
          if (data.total < 1) {
            this.setState({ error: true });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              totalPhotos: data.total,
              loading: false,
            }));

            console.log('длина массива', data.hits.length);
            console.log('всего фото', data.total);

            if (data.hits.length >= data.total) {
              console.log('no more photos');
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
  //////
  toggleLoadMore = () => {
    this.setState(({ showLoadMore }) => ({
      showLoadMore: !showLoadMore,
    }));
  };
  //////

  handleChange = e => {
    this.setState({ inputValue: e.target.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.input.value;
    if (searchValue.trim() === '') {
      toast.warn('Enter Search value', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    } else {
      // this.props.onSubmit(this.state.inputValue);
      this.setState({ inputValue: searchValue });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  currentPhoto = e => {
    console.log('App - e.target.id:', e.target.id);
    this.setState({ currentImgInd: e.target.id });
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
      showLoadMore,
      currentImgInd,
      error,
      totalPhotos,
    } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer />
        {loading && <Loader />}

        {error && <h1>Нет данных соответствующих введенному запросу</h1>}
        <ImageGallery images={images} onClick={this.currentPhoto} />
        {/* {console.log('showLoadMore', showLoadMore)} */}
        {/* {showLoadMore && <Button onClick={this.renderMore}>Load more</Button>} */}
        {console.log('totalPhotos:', totalPhotos)}
        {console.log('images.length', images.length)}

        {totalPhotos > images.length && (
          <Button onClick={this.renderMore}>Load more</Button>
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            photos={images}
            currentImgInd={currentImgInd}
          ></Modal>
        )}
      </div>
    );
  }
}

export default App;

//
//
//
//
//
//

// render() {
//     const { loading, value, images, status, showModal, showLoadMore } =
//       this.state;
//     if (status === 'idle') {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ToastContainer />
//         </>
//       );
//     }
//     if (status === 'pending') {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ToastContainer />
//           <Loader />
//         </>
//       );
//     }
//     if (status === 'rejected') {
//       return <h1>Нет данных соответствующих введенному запросу</h1>;
//     }
//     if (status === 'resolved') {
//       return (
//         <div className={css.app}>
//           <Searchbar onSubmit={this.handleSubmit} />
//           <ToastContainer />
//           <ImageGallery
//             images={this.state.images}
//             onClick={this.currentPhoto}
//           />

//           {showLoadMore && <Button onClick={this.renderMore}>Load more</Button>}
//           {showModal && (
//             <Modal
//               onClose={this.toggleModal}
//               photos={this.state.images}
//               currentImgInd={this.state.currentImgInd}
//             ></Modal>
//           )}
//         </div>
//       );
//     }
//   }
