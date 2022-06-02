import React from "react";
import { ScrollArea, Placeholder } from "@storybook/components";
import { MockItem } from './MockItem';


export const PanelContainer = ({ mockData }) => {
  
  const onChange = () => {}

  if(!mockData || mockData.length === 0) {
    return (
      <Placeholder>
        No Mock data found.
      </Placeholder>
    )
  }
  return (
    <ScrollArea>
      {
        mockData.map(({searchParamKeys, path, ...rest}) => <MockItem onChange={(name, value) => onChange(item, name, value)} {...rest} />)
      }
    </ScrollArea>
  );
}
