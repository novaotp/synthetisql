
// React
import { type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

// Internal
import { Labeled } from "..";
import { useCustomSearchParams } from "@hooks/useCustomSearchParams";

export const Filter = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, set, remove } = useCustomSearchParams();

  const handleOnFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    if (event.target.value === '') {
      router.push(`${pathname}?${remove('filter')}`);
      return;
    }

    router.push(`${pathname}?${set('filter', event.target.value)}`);
  }

  return (
    <Labeled label='Filter' htmlFor='filter'>
      <input type="text" defaultValue={searchParams.get('filter') ?? ''} placeholder="Search a diagram..." onChange={handleOnFilterChange} />
    </Labeled>
  )
}
