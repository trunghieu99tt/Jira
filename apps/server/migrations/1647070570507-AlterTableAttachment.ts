import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAttachment1647070570507 implements MigrationInterface {
  name = 'AlterTableAttachment1647070570507';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\`
            ADD \`comment_id\` bigint NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`task_id\` \`task_id\` bigint NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`attachments\` CHANGE \`task_id\` \`task_id\` bigint NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE \`attachments\` DROP COLUMN \`comment_id\`
        `);
  }
}
