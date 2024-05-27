import { DamageItem as DamageItemType} from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  damageItem: DamageItemType;
  addToCart: () => void;
};

const DamageItem = ({ damageItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{damageItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        KD{(damageItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default DamageItem;