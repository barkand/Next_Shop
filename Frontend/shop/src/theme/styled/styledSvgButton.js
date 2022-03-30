import { forwardRef } from "react";
import PropTypes from "prop-types";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { Stack } from "@mui/material";

const ButtonRoot = forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="250" height="250" {...other} ref={ref}>
      <polygon points="0,250 0,0 250,0 250,250" className="bg" />
      <polygon points="0,250 0,0 250,0 250,250" className="borderEffect" />
      <foreignObject x="0" y="0" width="250" height="250">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  800: "#004C99",
  900: "#003A75",
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  overflow: visible;
  cursor: pointer;
  --main-color: ${theme.palette.mode === "light" ? blue[600] : blue[100]};
  --hover-color: ${theme.palette.mode === "light" ? blue[50] : blue[900]};
  --active-color: ${theme.palette.mode === "light" ? blue[100] : blue[800]};

  & polygon {
    fill: transparent;
    transition: all 800ms ease;
    pointer-events: none;
  }
  
  & .bg {
    stroke: var(--main-color);
    stroke-width: 1;
    filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
    fill: transparent;
  }

  & .borderEffect {
    stroke: var(--main-color);
    stroke-width: 2;
    stroke-dasharray: 150 600;
    stroke-dashoffset: 150;
    fill: transparent;
  }

  &:hover,
  &.${buttonUnstyledClasses.focusVisible} {
    .borderEffect {
      stroke-dashoffset: -600;
    }

    .bg {
      fill: var(--hover-color);
    }
  }

  &:focus,
  &.${buttonUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[400] : blue[200]};
    outline-offset: 3px;
  }

  &.${buttonUnstyledClasses.active} { 
    & .bg {
      fill: var(--active-color);
      transition: fill 300ms ease-out;
    }
  }

  & foreignObject {
    pointer-events: none;

    & .content {
      font-size: 1.5rem;
      font-family: IBM Plex Sans, sans-serif;
      font-weight: 500;
      line-height: 2.5;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--main-color);
      text-transform: uppercase;
    }

    & svg {
      margin: 0 5px;
    }
  }`
);

const SvgButton = forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

export default function StyledSvgButton({ title, icon }) {
  return (
    <SvgButton>
      <Stack spacing={2} alignItems="center">
        {icon}
        {title}
      </Stack>
    </SvgButton>
  );
}
