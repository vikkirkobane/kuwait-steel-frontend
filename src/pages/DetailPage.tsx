import { useGetReport } from "@/api/ReportApi";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { LoaderCircle } from 'lucide-react';
import { DamageItem as DamageItemType } from "../types";
import ReportInfo from "@/components/ReportInfo";
import DamageItem from "@/components/DamageItem";
import OrderSummary from "@/components/OrderSummary";
import UpdateReportLink from "@/components/UpdateReportLink";

import { useGetMyUser } from "@/api/MyUserApi";

//import { useSearchReports } from "@/api/ReportApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { reportId } = useParams();
  const { report, isLoading } = useGetReport(reportId);
  
  const { currentUser, isLoading: isUserLoading } = useGetMyUser(null);
 // const [storedUser, setstoredUser] = useState(currentUser || null);
// 
//   useEffect(() => {
//     if (currentUser !== undefined && currentUser !== null) {
//       setstoredUser(currentUser);
//     }
//   }, [currentUser]);
//   
  if (!currentUser) {
    return isUserLoading;
  }
 
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${reportId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  
  const addToCart = (damageItem: DamageItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === damageItem._id
      );
      
      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === damageItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: damageItem._id,
            name: damageItem.name,
            price: damageItem.price,
            quantity: 1,
          },
        ]
      }

      sessionStorage.setItem(
        `cartItems-${reportId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${reportId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

    
  
  if (isLoading || !report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle />
      </div>
    )
  };
  
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={report.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <ReportInfo report={report} />
          <span className="text-2xl font-bold tracking-tight">Damages</span>
          {report.damageItems.map((damageItem) => (
            <DamageItem
              damageItem={damageItem}
              addToCart={() =>addToCart(damageItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              //report={report}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            
          </Card>
          <br/>
          <UpdateReportLink
            report={report}
            currentUser={currentUser}
          />
        </div>
      </div>
    </div>
  )
};


export default DetailPage;