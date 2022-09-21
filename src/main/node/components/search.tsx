import { useState } from 'react';
import { useRouter } from 'next/router';

import { Autocomplete } from '@mantine/core';

export default function SearchBar() {
  const router = useRouter();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      router.push(`/stocks/${e.target.value}`);
    }
  };

  const [value, setValue] = useState('');
  const data = value.trim().length > 0 ? [] : [];

  return (
    <Autocomplete
      value={value}
      onChange={setValue}
      placeholder="Search"
      data={data}
      onKeyUp={handleKeyPress}
    />
  );
}
