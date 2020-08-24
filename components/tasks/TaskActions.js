import React, { Component } from "react";
import NotImplemented from "components/error/NotImplemented";
import Button from "components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PraiseButton from "components/praise/PraiseButton";

class TaskActions extends Component {
	render() {
		const { task } = this.props;
		return (
			<div>
				<span className="inline-flex">
					<span className="mr-2">
						<PraiseButton
							initialCount={task.praise}
							indexUrl={`/tasks/${task.id}`}
						/>
					</span>
					<span className="mr-2">
						<NotImplemented>
							<Button xs>
								<Button.Icon>
									<FontAwesomeIcon icon="comment" />
								</Button.Icon>
								Comment
							</Button>
						</NotImplemented>
					</span>
					<span className="mr-2">
						<NotImplemented>
							<Button xs>
								<Button.Icon>
									<FontAwesomeIcon icon="ellipsis-v" />
								</Button.Icon>
								More
							</Button>
						</NotImplemented>
					</span>
				</span>
			</div>
		);
	}
}

export default TaskActions;
