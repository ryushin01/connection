import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Filter = ({ categoryId }) => {
  const [sort, setSort] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const selectList = ['별점순', '리뷰순', '최신순'];
  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');

  const [posts, setPosts] = useState([]);

  const getReviewSort = () => {
    fetch(
      `http://10.58.52.73:8000/products/category/:${categoryId}?sort=${sort}&offset=${offset}&limit=${limit}`,
    )
      .then(response => response.json())
      .then(result => {
        setPosts(result);
      });
  };

  useEffect(() => {
    getReviewSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit, sort]);

  const movePage = pageNumber => {
    searchParams.set('offset', (pageNumber - 1) * 12);
    setSearchParams(searchParams.toString());
  };

  const handleSelect = e => {
    const selectedValue = e.target.value;

    if (selectedValue === '별점순') {
      return setSort('rating');
    } else if (selectedValue === '리뷰순') {
      return setSort('review');
    } else if (selectedValue === '최신순') {
      return setSort('created_at');
    }
  };

  return (
    <FilterWrap>
      <FilterInnerWrap>
        <Select onChange={handleSelect}>
          {selectList.map(item => {
            return (
              <Option key={item} value={item}>
                {item}
              </Option>
            );
          })}
        </Select>
      </FilterInnerWrap>
    </FilterWrap>
  );
};

const FilterWrap = styled.div`
  padding: 20px 0;
  text-align: right;
`;

const FilterInnerWrap = styled.div`
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 40%;
    right: 8px;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 0 0 1px 1px;
    border-color: ${props => props.theme.grayscaleF};
    transform: rotate(-45deg) scale(1) translateY(-50%);
  }
`;

const Select = styled.select`
  padding: 8px 32px 8px 12px;
  font-size: 20px;
  appearance: none;
  border-radius: 4px;
  background-color: ${props => props.theme.grayscaleA};
  color: ${props => props.theme.grayscaleF};
`;

const Option = styled.option`
  position: relative;
`;

export default Filter;
