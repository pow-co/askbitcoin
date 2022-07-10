import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, CardMedia, Grid, useMediaQuery } from '@mui/material';

// project import
import MainCard from 'components/ui-component/cards/MainCard';
import Avatar from 'components/ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

// third-party
import Slider from 'react-slick';
import Carousel, { Modal, ModalGateway } from 'react-images';
import useConfig from '../../../../hooks/useConfig';

// assets
const prod1 = '/assets/images/e-commerce/prod-1.jpg';
const prod2 = '/assets/images/e-commerce/prod-2.jpg';
const prod3 = '/assets/images/e-commerce/prod-3.jpg';
const prod4 = '/assets/images/e-commerce/prod-4.jpg';
const prod5 = '/assets/images/e-commerce/prod-5.jpg';
const prod6 = '/assets/images/e-commerce/prod-6.jpg';
const prod7 = '/assets/images/e-commerce/prod-7.jpg';
const prod8 = '/assets/images/e-commerce/prod-8.jpg';

const prodImage = '/assets/images/e-commerce';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ product }) => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const products = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

  const matchDownLG = useMediaQuery(theme.breakpoints.up('lg'));
  const initialImage = product.image ? `${prodImage}/${product.image}` : prod1;

  const [selected, setSelected] = useState(initialImage);
  const [modal, setModal] = useState(false);

  const images = [
    { source: prod1 },
    { source: prod2 },
    { source: prod3 },
    { source: prod4 },
    { source: prod5 },
    { source: prod6 },
    { source: prod7 },
    { source: prod8 }
  ];

  const lgNo = matchDownLG ? 4 : 3;

  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: products.length > 3 ? lgNo : products.length
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12}>
          <MainCard content={false} sx={{ m: '0 auto' }}>
            <CardMedia
              onClick={() => setModal(!modal)}
              component="img"
              image={selected}
              sx={{ borderRadius: `${borderRadius}px`, overflow: 'hidden', cursor: 'zoom-in' }}
            />
          </MainCard>
        </Grid>
        <Grid item xs={11} sm={7} md={9} lg={10} xl={8}>
          <Slider {...settings}>
            {products.map((item, index) => (
              <Box key={index} onClick={() => setSelected(item)} sx={{ p: 1 }}>
                <Avatar
                  outline={selected === item}
                  size={matchDownLG ? 'lg' : 'md'}
                  color="primary"
                  src={item}
                  variant="rounded"
                  sx={{ m: '0 auto', cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Slider>
        </Grid>
      </Grid>
      <ModalGateway>
        {modal ? (
          <Modal onClose={() => setModal(!modal)}>
            <Carousel views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};

ProductImages.propTypes = {
  product: PropTypes.object
};

export default ProductImages;
