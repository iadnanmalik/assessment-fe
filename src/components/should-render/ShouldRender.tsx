export const ShouldRender = (props:any) => {
  return !!props.if ? props.children : null;
};
