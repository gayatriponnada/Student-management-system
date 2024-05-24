<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select/index.js';
	import { studentform, type Studentschema } from '$lib/schemas';
	import { type SelectStudent } from '$lib/database/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import FormButton from '$ui/form/form-button.svelte';

	export let data: SuperValidated<Infer<Studentschema>>;
	export { data as form };
	const form = superForm(data, {
		validators: zodClient(studentform)
	});

	const { form: formData, enhance } = form;

	$: selectedsubject = $formData.subject
		? {
				label: $formData.subject,
				value: $formData.subject
			}
		: undefined;
</script>

<form action="?/formadd" method="POST" use:enhance class="grid grid-cols-5 gap-2 p-5 bg-muted">
	<Form.Field {form} name="rollNumber">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.rollNumber} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="marks">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.marks} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.email} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="subject">
		<Form.Control let:attrs>
			<Select.Root
				selected={selectedsubject}
				onSelectedChange={(v) => {
					v && ($formData.subject = v.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a subject" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="Machine Learning" label="Machine Learning" />
					<Select.Item value="Cyber Security" label="Cyber Security" />
					<Select.Item value="Software Engineering" label="Software Engineering" />
					<Select.Item value="Data Mining" label="Data Mining" />
					<Select.Item value="Data Communication" label="Data Communication" />
				</Select.Content>
			</Select.Root>
			<input bind:value={$formData.subject} name={attrs.name} hidden />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button type="submit">Create Button</Form.Button>
</form>
