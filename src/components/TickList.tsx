
type ItemList = (string | null)[];

export default function TickList({ itemList }: { itemList: ItemList }) {
    let cleanItemList = itemList.filter(Boolean);

    return (
        <ul className="lg:grid flex flex-wrap grid-cols-2 lg:gap-y-5 gap-y-3 gap-x-3">
            {cleanItemList.map((item) => (
                <li key={item} className="col-span-1 text-dark-3 text-sm lg:text-base flex items-center">
                    <div className="text-primary-1 lg:text-md text-base mr-2">
                        <i className="bi bi-check2" />
                    </div>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
