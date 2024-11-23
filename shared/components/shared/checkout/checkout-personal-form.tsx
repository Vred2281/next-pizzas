import React from "react";
import { FormInput } from "../form";
import { WhiteBlock } from "../white-block";
import { Input } from "../../ui";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="Ваше имя"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Ваша фамилия"
        />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="Ваш телефон"
        />
        <FormInput name="email" className="text-base" placeholder="Ваш email" />
      </div>
    </WhiteBlock>
  );
};
