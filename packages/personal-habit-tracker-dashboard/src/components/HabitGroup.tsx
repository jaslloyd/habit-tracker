import React from "react";
import PropTypes from "prop-types";
import CardBox from "./CardBox";

interface HabitGroup {
  category: string;
  children: React.ReactNode;
}

const HabitGroup: React.SFC<HabitGroup> = ({ category, children }) => (
  <CardBox name={category}>{children}</CardBox>
);

export default HabitGroup;
