import * as React from "react";

const SvgIcon: React.FC<React.SVGProps<SVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    fill="none"
    viewBox="0 0 1233 937"
  >
    <path fill="#fff" d="M1064.1 749.656 872 916.634H212L20 749.656z"></path>
    <path
      stroke='currentColor'
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      strokeWidth="30"
      d="M368 916.634h504l192.1-166.977H20l192 166.977zM1064 749.43l149-83M244.9 20c-98.1 85.315-98.1 223.419 0 308.734l-9.4-8.175c98.1 85.315 98.1 223.42 0 308.735M546.7 20c-98.1 85.315-98.1 223.419 0 308.734l-9.4-8.175c98.1 85.315 98.1 223.42 0 308.735M848.6 20c-98.1 85.315-98.1 223.419 0 308.734l-9.4-8.175c98.1 85.315 98.1 223.42 0 308.735"
    ></path>
  </svg>
);

export default SvgIcon;
