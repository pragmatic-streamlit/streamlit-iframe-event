import React from "react";
import { withStreamlitConnection, StreamlitComponentBase, ComponentProps, Streamlit } from 'streamlit-component-lib';
import IframeResizer from "iframe-resizer-react";

export enum StreamlitEventType {
  LOGIN_SUCCESS,
  LOGIN_FAILED
}

export interface StreamlitEvent {
  type: StreamlitEventType;
  token?: string
}

export const noticeStreamlit = (event: StreamlitEvent) =>
  Streamlit.setComponentValue(event)

interface IProps {
  args: any
}

interface IState {

}

class CustomStreamlitComponent extends StreamlitComponentBase<IState> {
  private args: IProps;

  constructor(props: ComponentProps) {
    super(props);
    this.args = props.args;
    this.state = {

    }
  }

  componentDidMount(): void {
    Streamlit.setFrameHeight()
    window.addEventListener('message', this.handleMessage, false);
  }

  componentDidUpdate(): void {
    Streamlit.setFrameHeight()
  }

  forceResize(): void {
    Streamlit.setFrameHeight()
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.handleMessage, false);
  }

  handleMessage = (event: MessageEvent) => {
    if ("data" in event) {
      // check login event info, event detection can be defined outside
      if ("code" in event.data) {
        if (event.data.code === 0) {
          console.log("login success", event.data)
          noticeStreamlit({
            type: StreamlitEventType.LOGIN_SUCCESS,
            token: event.data.token
          })
        } else {
          console.log("login failed", event.data)
          noticeStreamlit({
            type: StreamlitEventType.LOGIN_FAILED
          })
        }
      } else {
        console.log("streamlit message", event.data)
      }
    } else {
      console.log("no data in event", event)
    }
  }
  

  public render(): React.ReactNode {
    const { args } = this.props
    return (
        <IframeResizer log heightCalculationMethod="lowestElement" src={args["url"]} title="InnerSSO" frameBorder="0" onResized={this.forceResize} sizeWidth={true} checkOrigin={false}/>
    )
  }
}

export default withStreamlitConnection(CustomStreamlitComponent);
