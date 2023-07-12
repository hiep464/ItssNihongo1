import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TranslateIcon from '@mui/icons-material/Translate';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import StarRateIcon from '@mui/icons-material/StarRate';
import { matchingNannyApi } from '../../api/home.api';


const NannyFilter = ({
  setNannies,
  setIsLoading,
  setIsFilter,
  languages, setLanguages,
  cookings, setCookings,
  childCares, setChildCares,
  prices, setPrices,
  ratings, setRatings,
  handleCancelFilter
}) => {

  const getActiveNames = (array) => {
    return array.filter((item) => item.active === true).map((item) => item.value);
  };

  const handleSubmitFilter = () => {
    const languageF = getActiveNames(languages);
    const cookingF = getActiveNames(cookings);
    const childCareF = getActiveNames(childCares);
    const priceF = getActiveNames(prices);
    let formData = {
      // rating: rating,
      userLanguage: languageF.length === 1 ? languageF[0] : languageF,
      cookExp: cookingF.length === 1 ? cookingF[0] : cookingF,
      careExp: childCareF.length === 1 ? childCareF[0] : childCareF,
      salary: priceF.length === 1 ? priceF[0] : priceF,
    };

    if (languageF.length === 0) {
      delete formData.userLanguage;
    }

    if (cookingF.length === 0) {
      delete formData.cookExp;
    }

    if (childCareF.length === 0) {
      delete formData.careExp;
    }

    if (priceF.length === 0) {
      delete formData.salary;
    }

    setIsFilter(false);
    setNannies([]);
    setIsLoading(true);
    matchingNannyApi(formData)
      .then(res => {
        setIsLoading(false)
        setNannies(res.data)
      })
      .catch(err => {
        setIsLoading(false)
      })
  };

  return (
    <Typography
      component="div"
      sx={{
        zIndex: '1000',
        // border: '1px solid #a4a4a4',
        // borderRadius: '20px',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        // paddingBottom={'50px'} paddingLeft={'20px'}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontSize: '30px',
            color: 'black',
            fontWeight: '700',
            marginLeft: '24px',
            marginTop: '14px',
            marginBottom: '8px',
            userSelect: 'none',
          }}
        >
          Interests
        </Typography>

        <Typography component="div"
          className='filter-item'
        >
          <Button
            size="small"
            sx={{
              width: '136px',
              borderRadius: '16px',
              backgroundColor: '#ebebeb',
              color: '#a744be',
              marginLeft: '14px',
              pointerEvents: "none"
            }}
            startIcon={<TranslateIcon sx={{ color: '#a744be' }} />}
          >
            言語
          </Button>
          <Box margin={'10px'} display={'flex'} width={'100%'} flexWrap={'wrap'}>
            {languages.map((item, key) => {
              return (
                <Button
                  className={item.active ? 'filter-language__btn--active' : ''}
                  variant="outlined"
                  size="small"
                  key={key}
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.5em 1em',
                    margin: '6px 10px',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setLanguages((prevItems) =>
                      prevItems.map((item, index) =>
                        index === key ? { ...item, active: !item.active } : item,
                      ),
                    );
                  }}
                >
                  {item?.name}
                </Button>
              );
            })}
          </Box>
        </Typography>

        <Typography component="div"
          className='filter-item'
        >
          <Button
            size="small"
            sx={{
              width: '136px',
              borderRadius: '16px',
              backgroundColor: '#ebebeb',
              color: '#ff6624',
              marginLeft: '14px',
              pointerEvents: "none"
            }}
            startIcon={<OutdoorGrillIcon sx={{ color: '#ff6624' }} />}
          >
            料理
          </Button>
          <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
            {cookings.map((item, key) => {
              return (
                <Button
                  className={item.active ? 'filter-cookings__btn--active' : ''}
                  variant="outlined"
                  size="small"
                  key={key}
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.5em 1em',
                    margin: '6px 10px',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setCookings((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                  {item?.name}
                </Button>
              );
            })}
          </Box>
        </Typography>

        <Typography component="div"
          className='filter-item'
        >
          <Button
            size="small"
            sx={{
              width: '136px',
              borderRadius: '16px',
              backgroundColor: '#ebebeb',
              color: 'primary.main',
              marginLeft: '14px',
              pointerEvents: "none"
            }}
            startIcon={<ChildFriendlyIcon sx={{ color: 'primary.main' }} />}
          >
            世話
          </Button>
          <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
            {childCares.map((item, key) => {
              return (
                <Button
                  className={item.active ? 'filter-childcare--active' : ''}
                  variant="outlined"
                  key={key}
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.5em 1em',
                    margin: '6px 10px',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setChildCares((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                  {item?.name}
                </Button>
              );
            })}
          </Box>
        </Typography>

        <Typography component="div"
          className='filter-item'
        >
          <Button
            size="small"
            sx={{
              width: '136px',
              borderRadius: '16px',
              backgroundColor: '#ebebeb',
              color: '#b70f0a',
              marginLeft: '14px',
              pointerEvents: "none"
            }}
            startIcon={<AttachMoneyIcon sx={{ color: '#b70f0a' }} />}
          >
            価格
          </Button>
          <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
            {prices.map((item, key) => {
              return (
                <Button
                  className={item.active ? 'filter-prices__btn--active' : ''}
                  variant="outlined"
                  key={key}
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.75em 1em',
                    margin: '6px 10px',
                    fontSize: '12px',
                  }}

                  onClick={() => {
                    setPrices((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                  {item?.name}
                </Button>
              );
            })}
          </Box>
        </Typography>

        <Typography component="div"
          className='filter-item'
        >
          <Button
            size="small"
            sx={{
              width: '136px',
              borderRadius: '16px',
              backgroundColor: '#ebebeb',
              color: '#0ab718',
              marginLeft: '14px',
              pointerEvents: "none"
            }}
            startIcon={<StarPurple500Icon sx={{ color: '#0ab718' }} />}
          >
            評価
          </Button>
          <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
            {ratings.map((item, key) => {
              return (
                <Button
                  className={item.active ? 'filter-rating__btn--active' : ''}
                  variant="outlined"
                  key={key}
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.75em 1em',
                    margin: '6px 10px',
                    fontSize: '12px',
                  }}
                  endIcon={<StarRateIcon color={item.active ? "#fff" : "#0ab718"} />}
                  onClick={() => {
                    setRatings((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                  {item?.name}
                </Button>
              );
            })}
          </Box>
        </Typography>

        <Typography component="div" sx={{ float: 'right', marginRight: '14px' }}>
          <Button
            type='button'
            variant="contained"
            sx={{
              borderRadius: '20px',
              padding: '10px 30px',
              marginLeft: '20px',
              textTransform: 'none',
              backgroundColor: 'var(--secondary-color)',
              ':hover': { backgroundColor: 'var(--secondary-color)', opacity: 0.85 }
            }}
            onClick={handleSubmitFilter}
          >
            マッチング
          </Button>
          <Button
            type='button'
            onClick={() => {
              handleCancelFilter()
            }}
            variant="contained"
            sx={{
              borderRadius: '20px',
              padding: '10px 30px',
              backgroundColor: '#929292',
              border: 'none',
              ml: 4,
              textTransform: 'none',
              ':hover': { backgroundColor: 'red' },
            }}
          >
            キャンセル
          </Button>
        </Typography>
      </Box>
    </Typography>
  )
}

export default NannyFilter