
// React
import { type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

// Internal
import { Labeled } from "..";
import { useCustomSearchParams } from "@hooks/useCustomSearchParams";

export const Sort = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, set, remove } = useCustomSearchParams();

  const handleOnSortChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();

    if (event.target.value === '') {
      router.push(`${pathname}?${remove('sort')}`);
      return;
    }

    router.push(`${pathname}?${set('sort', event.target.value)}`);
  }

  return (
    <Labeled label='Sort' htmlFor='sort'>
      <select defaultValue={searchParams.get('sort') ?? ''} onChange={handleOnSortChange}>
        <option value="">Newest to oldest</option>
        <option value="oldest-to-newest">Oldest to newest</option>
      </select>
    </Labeled>
  )
}
