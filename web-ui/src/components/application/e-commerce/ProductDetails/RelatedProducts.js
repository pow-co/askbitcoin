import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// third-party
import Slider from 'react-slick';

// project imports
import ProductCard from 'components/ui-component/cards/ProductCard';
import { useDispatch, useSelector } from 'store';
import { getRelatedProducts } from 'store/slices/product';

// ==============================|| PRODUCT DETAILS - RELATED PRODUCTS ||============================== //

const RelatedProducts = ({ id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [related, setRelated] = useState([]);
  const matchDownXl = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const { relatedProducts } = useSelector((state) => state.product);

  useEffect(() => {
    setRelated(relatedProducts);
  }, [relatedProducts]);

  useEffect(() => {
    dispatch(getRelatedProducts(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let noItems = 5;
  noItems = matchDownSM ? 1 : noItems;
  noItems = matchDownMD ? 2 : noItems;
  noItems = matchDownLG ? 3 : noItems;
  noItems = matchDownXl ? 4 : noItems;

  const settings = {
    dots: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    slidesToShow: noItems
  };

  let productResult = <></>;
  if (related) {
    productResult = related.map((product, index) => (
      <Box key={index} sx={{ p: 1.5 }}>
        <ProductCard
          key={index}
          id={product.id}
          image={product.image}
          name={product.name}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
        />
      </Box>
    ));
  }

  return <Slider {...settings}>{productResult}</Slider>;
};

RelatedProducts.propTypes = {
  id: PropTypes.string
};

export default RelatedProducts;
